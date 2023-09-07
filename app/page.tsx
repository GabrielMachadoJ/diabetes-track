"use client";
import React, { useState, useEffect } from "react";
import { Plus, PlusCircle } from "@phosphor-icons/react";
import ResultCard from "@/components/ResultCard";
import LogoDiabetes from "@/assets/LogoDiabetes.png";
import Image from "next/image";
import {
  collection,
  addDoc,
  getDoc,
  QuerySnapshot,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { format } from "date-fns";

interface medicaoProps {
  valor: number;
  hora: string;
}

export default function Home() {
  const [glicemia, setGlicemia] = useState<number>(0);
  const [medicoes, setMedicoes] = useState([]);
  const [maiorMedida, setMaiorMedida] = useState<number>(0);
  const [menorMedida, setMenorMedida] = useState<number>(0);
  const [mediaDasMedida, setMediaDasMedida] = useState<number>(0);

  const registrarDado = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (glicemia > 0) {
      await addDoc(collection(db, "medicoes"), {
        valor: glicemia,
        horario: new Date(),
      });
      setGlicemia(0);
      getDados();
    }
  };

  const getDados = async () => {
    const q = query(collection(db, "medicoes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itensArr: any = [];
      querySnapshot.forEach((doc) => {
        const objMedicoes = {
          valor: doc.data().valor,
          hora: format(new Date(doc.data().horario.toDate()), "HH:mm:ss"),
        };
        itensArr.push(objMedicoes);
      });
      const maiorValor = Math.max(
        ...itensArr.map((obj: medicaoProps) => obj.valor)
      );
      const menorValor = Math.min(
        ...itensArr.map((obj: medicaoProps) => obj.valor)
      );
      const somaValores = itensArr.reduce(
        (acumulador: number, obj: any) => acumulador + obj.valor,
        0
      );
      const media = somaValores / itensArr.length;
      setMaiorMedida(maiorValor);
      setMenorMedida(menorValor);
      setMediaDasMedida(media);
      setMedicoes(itensArr);
      return () => unsubscribe();
    });
  };

  useEffect(() => {
    getDados();
  }, []);

  return (
    <main className="flex min-h-screen h-screen py-10 px-2 flex-col items-center justify-center">
      <div className="flex flex-col px-2 w-full h-screen rounded-lg shadow-2xl items-center border-2">
        <Image
          src={LogoDiabetes}
          className="mt-10 px-2 rounded-lg"
          alt="Logo do dia mundial do diabetes"
        />
        <span className="mt-10 mb-4 font-mono text-xl">
          Como está sua diabetes hoje?
        </span>
        <div className="flex p-2 justify-between w-full">
          <input
            type="number"
            className="w-full border shadow-inner shadow-purple-100 border-slate-200 rounded-2xl mr-2 p-2 "
            value={glicemia}
            placeholder="Coloque a medição"
            onChange={(e) => setGlicemia(e.target.valueAsNumber)}
          />
          <button
            onClick={registrarDado}
            className="flex-1 text-lg bg-violet-700 p-2 rounded-xl hover:scale-95 "
          >
            <Plus size={44} className="text-slate-50 hover:text-green-500" />
          </button>
        </div>
        <div className="border-b-2 w-11/12 mt-4 mb-2" />
        <span className="my-4">Dados da Semana</span>
        <div className="flex px-2 w-full flex-row mt-2">
          <ResultCard label="Maior" value={maiorMedida} />
          <ResultCard label="Menor" value={menorMedida} />
          <ResultCard label="Média" value={mediaDasMedida} />
        </div>
        <div className="w-full mt-16">
          <table className="min-w-full border-2 bg-white">
            <thead className="border-2">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Valor
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Período
                </th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">
                  Horário
                </th>
              </tr>
            </thead>
            <tbody>
              {medicoes.map((medida: medicaoProps, index) => (
                <tr key={index} className="border-b-2 ">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {medida.valor}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {medida.hora > "06:00:00" && medida.hora < "12:00:00"
                      ? "⛅Manhã"
                      : medida.hora > "12:00:00" && medida.hora < "18:00:00"
                      ? "🌞Tarde"
                      : "🌚Noite"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {medida.hora}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

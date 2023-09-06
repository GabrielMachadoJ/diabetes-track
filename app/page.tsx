"use client";
import React, { useState } from "react";
import { Plus, PlusCircle } from "@phosphor-icons/react";
import ResultCard from "@/components/ResultCard";
import LogoDiabetes from "@/assets/LogoDiabetes.png";
import Image from "next/image";

export default function Home() {
  const [glicemia, setGlicemia] = useState("");

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
            onChange={(e) => setGlicemia(e.target.value)}
          />
          <button className="flex-1 text-lg bg-violet-700 p-2 rounded-xl hover:scale-95 ">
            <Plus size={44} className="text-slate-50 hover:text-green-500" />
          </button>
        </div>
        <div className="border-b-2 w-11/12 mt-4 mb-2" />
        <span className="my-4">Dados da Semana</span>
        <div className="flex px-2 w-full flex-row mt-2">
          <ResultCard label="Maior" value={219} />
          <ResultCard label="Menor" value={89} />
          <ResultCard label="Média" value={154} />
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
              <tr className="border-b-2 ">
                <td className="px-6 py-4 text-sm text-gray-900">89</td>
                <td className="px-6 py-4 text-sm text-gray-900">🌞Manhã</td>
                <td className="px-6 py-4 text-sm text-gray-900">11:30</td>
              </tr>
              <tr className="border-b-2 ">
                <td className="px-6 py-4 text-sm text-gray-900">89</td>
                <td className="px-6 py-4 text-sm text-gray-900">🌞Manhã</td>
                <td className="px-6 py-4 text-sm text-gray-900">11:30</td>
              </tr>
              <tr className="border-b-2 ">
                <td className="px-6 py-4 text-sm text-gray-900">89</td>
                <td className="px-6 py-4 text-sm text-gray-900">🌞Manhã</td>
                <td className="px-6 py-4 text-sm text-gray-900">11:30</td>
              </tr>
              <tr className="border-b-2 ">
                <td className="px-6 py-4 text-sm text-gray-900">89</td>
                <td className="px-6 py-4 text-sm text-gray-900">🌞Manhã</td>
                <td className="px-6 py-4 text-sm text-gray-900">11:30</td>
              </tr>
              <tr className="border-b-2 ">
                <td className="px-6 py-4 text-sm text-gray-900">219</td>
                <td className="px-6 py-4 text-sm text-gray-900">🌚Noite</td>
                <td className="px-6 py-4 text-sm text-gray-900">18:45</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

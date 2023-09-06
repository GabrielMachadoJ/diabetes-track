interface ResultCardProps {
  value?: string | number;
  label: string;
}

export default function ResultCard({ value, label }: ResultCardProps) {
  return (
    <div className="flex-1 h-16 last:mr-0 mr-2 ">
      <label htmlFor="label dos inputs">{label}</label>
      <input
        type="number"
        className="w-full shadow-inner shadow-purple-100 border border-slate-200 rounded-2xl pl-2 h-full"
        readOnly
        value={value}
      />
    </div>
  );
}

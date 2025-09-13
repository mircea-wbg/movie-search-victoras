type SearchBoxProps = {
  value: string;
  onChange: (val: string) => void;
};

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder="Ce film dorești să cauți astăzi?"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 mb-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />
  );
}

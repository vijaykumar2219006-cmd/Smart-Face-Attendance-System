import { FaSearch } from "react-icons/fa";

export default function SearchBar({
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="relative mb-6">

      <FaSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />

    </div>
  );
}
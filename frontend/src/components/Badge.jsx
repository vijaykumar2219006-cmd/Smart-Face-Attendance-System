export default function Badge({ children }) {
  return (
    <span className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 font-semibold">
      {children}
    </span>
  );
}
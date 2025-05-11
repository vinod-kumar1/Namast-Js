export default function Shimmer() {
  return (
    <div className="shim-container">
      {Array(10)
        .fill(0)
        .map((_, id) => (
          <div key={id} className="shim-card"></div>
        ))}
    </div>
  );
}

export default function Shimmer() {
  return (
    <div className="shim-container flex flex-wrap gap-4 rounded-md">
      {Array(10)
        .fill(0)
        .map((_, id) => (
          <div
            key={id}
            className="shim-card w-[200px] bg-orange-400 h-[300px]"
          ></div>
        ))}
    </div>
  );
}

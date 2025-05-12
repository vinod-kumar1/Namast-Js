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

export function DetailsShimmer({ length }) {
  return (
    <div className="flex flex-wrap gap-4 top-4 rounded-md">
      {Array(length || 10)
        .fill(0)
        .map((_, id) => (
          <div
            key={id}
            className="bg-slate-300 w-[95%] py-4 relative px-2 rounded-md left-2"
          ></div>
        ))}
    </div>
  );
}

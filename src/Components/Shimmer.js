import RestComponent from "./RestCard";

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
export function MainComponent({ title, itemCards, restName }) {
  return (
    <div className="relative top-10">
      <details className="bg-slate-300 w-[95%] py-4 relative px-2 rounded-md left-2">
        <summary className="hover:cursor-pointer">{title}</summary>
        <div className="veg rest-category relative top-4">
          <h3>{restName}</h3>
          <div
            className={`${
              itemCards?.length > 0 ? "bg-slate-100" : "bg-transparent"
            } w-[100%] flex flex-wrap gap-4 justify-center relative`}
          >
            {itemCards?.length > 0 ? (
              itemCards?.map((rest) => {
                return (
                  <RestComponent
                    restName={restName}
                    key={rest?.card?.info?.id}
                    {...rest?.card?.info}
                  />
                );
              })
            ) : (
              <div className="relative top-8">
                <p>No items</p>
              </div>
            )}
          </div>
        </div>
      </details>
    </div>
  );
}

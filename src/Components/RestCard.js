import { useState, useEffect } from "react";
import Shimmer, { DetailsShimmer } from "./Shimmer";
import { useParams, Link } from "react-router";

function MainComponent({ title, itemCards, restName }) {
  return (
    <div className="relative top-10">
      <details className="bg-slate-300 w-[95%] py-4 relative px-2 rounded-md left-2">
        <summary className="hover:cursor-pointer">
          {title} {itemCards?.length}
        </summary>
        <div className="veg rest-category relative top-4">
          <h3 className="flex justify-center">{restName}</h3>
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

function RestComponent({ name, id, description, imageId, price }) {
  return (
    <div
      key={id}
      className="rest-comp w-[250px] rounded-md bg-slate-200 min-h-max p-4 hover:scale-[1.01] relative top-2"
    >
      {imageId ? (
        <img
          className="rounded-md mb-2"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${imageId}`}
          alt="dish-photo"
        />
      ) : (
        <img
          className="rounded-md mb-2"
          src="https://imgs.search.brave.com/W9gRWLnV_3bcUYJMXPa_IxwGgY1fTWUJV96eAiq6cKw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb21w/YW5pZXNsb2dvLmNv/bS9pbWcvb3JpZy9T/V0lHR1kuTlMtZmJk/NjI3MzQucG5nP3Q9/MTczMTk4NzA2MA"
        />
      )}
      <span>
        <hr />
        <h3>
          {name} ( ₹{price / 100}.00 )
        </h3>
      </span>
      <p className="w-[200px] font-thin mt-2">{description}</p>
    </div>
  );
}

export default function RestCard() {
  let [res, setRes] = useState([]);
  let { restId, restName } = useParams();
  useEffect(() => {
    async function helper() {
      let fetchRest = await fetch(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.97530&lng=77.59100&restaurantId=${restId}`
      );
      let json = await fetchRest.json();
      setRes(json);
    }
    helper();
  }, []);

  if (res.length == 0) return <DetailsShimmer length={res?.length} />;

  let Starters =
    res?.data?.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(
      (card) => card.card.card.itemCards
    );

  return (
    <div>
      <Link to="/" className="absolute right-4 top-[150px] underline">
        Go Back
      </Link>
      <div className="flex flex-col gap-2">
        {Starters.map((card) => {
          let restCard = card.card.card;
          console.log("itemCards" + restCard.itemCards);
          return (
            <MainComponent
              key={restCard.categoryId}
              restName={restName}
              {...restCard}
            />
          );
        })}
      </div>
    </div>
  );
}

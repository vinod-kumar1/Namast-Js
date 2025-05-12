import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams, Link } from "react-router";

function MainComponent({ title, itemCards, restName }) {
  return (
    <div>
      <details>
        <summary>{title}</summary>
        <div className="veg rest-category relative top-4 flex flex-col items-center">
          <h3>{restName}</h3>
          <div
            className={`${
              itemCards?.length > 0 ? "bg-slate-100" : "bg-transparent"
            } w-[100%] flex flex-wrap gap-4 justify-center relative`}
          >
            {itemCards?.length > 0 ? (
              itemCards?.map((rest) => {
                // console.log(rest);
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
          <Link to={"/"} className="underline cursor-pointer">
            Go Back
          </Link>
        </div>
      </details>
    </div>
  );
}

function RestComponent({ restName, name, id, description, imageId, price }) {
  return (
    <div
      key={id}
      className="rest-comp w-[250px] rounded-md bg-slate-200 min-h-max p-4 hover:scale-[1.01]"
    >
      <h3>{restName}</h3>
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
      // console.log(json?.data?.cards[4].groupedCard.cardGroupMap.REGULAR.cards);
    }
    helper();
  }, []);

  if (res.length == 0) return <Shimmer />;

  let Starters =
    res?.data?.cards[4].groupedCard.cardGroupMap.REGULAR.cards.filter(
      (card) => card.card.card.itemCards
    );
  // res?.data?.cards[4].groupedCard.cardGroupMap.REGULAR.cards[3].card.card
  //   .itemCards;
  // console.log(Starters);

  return (
    <div>
      {Starters.map((card) => {
        let restCard = card.card.card;
        console.log(restCard);
        return (
          <MainComponent
            key={restCard.categoryId}
            restName={restName}
            {...restCard}
          />
        );
      })}
      {/* <div className="veg rest-category relative top-4 flex flex-col items-center">
        <h3>{restName}</h3>
        <div
          className={`${
            Starters?.length > 0 ? "bg-slate-100" : "bg-transparent"
          } w-[100%] flex flex-wrap gap-4 justify-center relative`}
        >
          {Starters?.length > 0 ? (
            Starters?.map((rest) => (
              <RestComponent key={rest.card.info.id} {...rest?.card?.info} />
            ))
          ) : (
            <div className="relative top-8">
              <p>No items</p>
            </div>
          )}
        </div>
        <Link to={"/"} className="underline cursor-pointer">
          Go Back
        </Link>
      </div> */}
    </div>
  );
}

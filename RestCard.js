import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";

function RestComponent({ name, id, description, imageId, price }) {
  return (
    <div key={id} className="rest-comp">
      {imageId ? (
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/${imageId}`}
          alt="dish-photo"
        />
      ) : (
        <img src="https://imgs.search.brave.com/W9gRWLnV_3bcUYJMXPa_IxwGgY1fTWUJV96eAiq6cKw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jb21w/YW5pZXNsb2dvLmNv/bS9pbWcvb3JpZy9T/V0lHR1kuTlMtZmJk/NjI3MzQucG5nP3Q9/MTczMTk4NzA2MA" />
      )}
      <span>
        <h3>
          {name} ( ₹{price / 100}.00 )
        </h3>
      </span>
      <p>{description}</p>
    </div>
  );
}

export default function RestCard() {
  let [res, setRes] = useState([]);
  let { restId } = useParams();
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

  if (res.length == 0) return <Shimmer />;
  console.log(
    res?.data?.cards[4].groupedCard.cardGroupMap.REGULAR.cards[3].card.card
      .itemCards
  );
  let VegStarters =
    res?.data?.cards[4].groupedCard.cardGroupMap.REGULAR.cards[3].card.card
      .itemCards;
  //   let nonVegStarters =
  //     res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
  //       ?.card?.categories[1];

  return (
    <div>
      <div className="veg rest-category">
        <h3>VegStarters</h3>
        {VegStarters?.map((rest) => (
          <RestComponent key={rest.card.info.id} {...rest?.card?.info} />
        ))}
      </div>
      <div className="non-veg rest-category">
        <h3>Non-Veg Starters</h3>
      </div>
    </div>
  );
}

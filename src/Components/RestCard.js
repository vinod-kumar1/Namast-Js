import { useState, useEffect, useContext, useRef } from "react";
import Shimmer, { DetailsShimmer } from "./Shimmer";
import { useParams, Link, Outlet } from "react-router";
import CartContext from "./CartContext";

function MainComponent({
  title,
  itemCards,
  restName,
  cart,
  setCart,
  showItem,
  isOpen,
}) {
  return (
    <div className="relative top-10">
      <details
        onClick={(e) => {
          e.preventDefault();
          showItem();
        }}
        open={isOpen}
        className="bg-slate-300 w-[95%] py-4 relative px-2 rounded-md left-2"
      >
        <summary className="hover:cursor-pointer">
          {title} ({itemCards?.length})
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
                    cart={cart}
                    setCart={setCart}
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
  let { setCart } = useContext(CartContext);
  let [count, setCount] = useState(0);
  return (
    <div
      key={id}
      className="rest-comp w-[250px] rounded-md bg-slate-200 min-h-max p-4 hover:scale-[1.01] relative top-2"
    >
      <div className="m-1 absolute bg-black text-white border-white border-[1px] rounded-md">
        <button
          disabled={count <= 0}
          onClick={() => {
            setCount((p) => p - 1);
            setCart((p) => {
              let res = [...p];
              let isExists = p.some((item) => item.id == id);

              if (isExists) {
                res = res.map((food) => {
                  let item = { ...food };
                  if (item.id == id) item.count - 1;
                  return item;
                });
              } else res = res.filter((item) => item.id != id);
              return res;
            });
          }}
          className=" px-2 border-r-[1px]"
        >
          -
        </button>
        <span className="w-4 px-2 text-white">Add {count}</span>
        <button
          onClick={() => {
            setCount((p) => p + 1);
            setCart((p) => {
              let res = [...p];
              let isExists = res.some((item) => item.id == id);
              if (isExists) {
                res = res.map((food) => {
                  let item = { ...food };
                  if (item.id == id) item.count = item.count + 1;
                  return item;
                });
              } else {
                res = [
                  ...res,
                  {
                    name,
                    price,
                    id,
                    count: 1,
                  },
                ];
              }
              return res;
            });
          }}
          className="w-max px-2 border-l-[1px] border-white"
        >
          +
        </button>
      </div>
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
  let [showIndex, setShowIndex] = useState(0);

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
        {Starters.map((card, index) => {
          let restCard = card.card.card;
          return (
            <MainComponent
              showItem={() => setShowIndex(index)}
              key={restCard.categoryId}
              restName={restName}
              {...restCard}
              isOpen={showIndex == index ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
}

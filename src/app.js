import React, { useEffect, useState } from "react";
import Shimmer from "./Components/Shimmer";
import { Link } from "react-router";

function App() {
  let [rest, setRest] = useState([]);
  let [filterRest, setFilterRest] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchRest() {
      let res = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.97530&lng=77.59100&collection=83639&tags=layout_CCS_Biryani&sortBy=&filters=&type=rcv2&offset=0&page_type=null",
        {
          headers: {
            "x-cors-api-key": "temp_a7d64221ae04ceb2eaa74f05b6d12a60",
          },
        }
      );
      let data = await res.json();
      let temp = [];
      for (let i = 3; i < data.data.cards.length; i++) {
        temp.push(data.data.cards[i].card.card.info);
      }
      setRest(temp);
      setFilterRest(temp);
      console.log(temp);
    }
    fetchRest();
  }, []);

  function searchRest() {
    setFilterRest(
      rest.filter(
        (rest) =>
          rest.name.toLowerCase().indexOf(search.toLocaleLowerCase()) != -1
      )
    );
  }

  return (
    <div className="container">
      <label className="relative top-4 flex justify-center">
        <input
          type="text"
          className="outline-none border-b-orange-600 border"
          placeholder=" So?..."
          value={search}
          onChange={(e) => {
            if (e.target.value == "") setFilterRest(rest);
            setSearch(e.target.value);
          }}
        />
        <button
          className="bg-blue-400 px-4 py-0.5 ml-1 rounded-md"
          onClick={searchRest}
        >
          Search
        </button>
      </label>
      <div className="rest-container relative top-6 flex flex-wrap gap-4">
        {filterRest.length > 0 ? (
          filterRest.map(
            ({
              avgRating,
              totalRatingsString,
              name,
              areaName,
              cloudinaryImageId,
              id,
            }) => {
              return (
                <div
                  key={id}
                  className="rest-card w-[200px] bg-slate-100 rounded-md"
                >
                  <Link to={`/${id}`}>
                    <img
                      className="rest-img shadow-md"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
                    />
                  </Link>
                  <h3>{name}</h3>
                  <p>Rating {avgRating} ⭐️</p>
                  <p>{totalRatingsString} Reviews</p>
                  <p className="address">At {areaName}</p>
                </div>
              );
            }
          )
        ) : (
          <Shimmer />
        )}
      </div>
    </div>
  );
}

export default App;

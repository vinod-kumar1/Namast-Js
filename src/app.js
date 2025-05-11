import React, { useEffect, useState } from "react";
import Shimmer from "/Components/Shimmer";
import { Link } from "react-router";

function App() {
  let [rest, setRest] = useState([]);
  let [filterRest, setFilterRest] = useState([]);
  let [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchRest() {
      let res = await fetch(
        "https://proxy.cors.sh/https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.97530&lng=77.59100&collection=83639&tags=layout_CCS_Biryani&sortBy=&filters=&type=rcv2&offset=0&page_type=null",
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
      <label>
        <input
          type="text"
          className="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            if (e.target.value == "") setFilterRest(rest);
            setSearch(e.target.value);
          }}
        />
        <button onClick={searchRest}>Search</button>
      </label>
      <div className="rest-container">
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
                <div key={id} className="rest-card">
                  <Link to={`/${id}`}>
                    <img
                      className="rest-img"
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

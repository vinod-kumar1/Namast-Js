import { useEffect, useState } from "react";

export default function Onlinestatus() {
  let [online, setOnline] = useState(true);

  let signal = {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: online ? "green" : "orange",
    color: online ? "green" : "orange",
    display: "inline-block",
  };

  useEffect(() => {
    window.addEventListener("online", (e) => {
      setOnline(true);
    });
    window.addEventListener("offline", (e) => {
      setOnline(false);
    });
  }, []);

  return (
    <p className="signal">
      {" "}
      <span style={signal}></span> Internet
    </p>
  );
}

import { useEffect, useState } from "react";

export default function Onlinestatus() {
  let [online, setOnline] = useState(true);

  let setOnlineTrue = () => {
    setOnline(true);
  };

  let setOnlineFalse = () => {
    setOnline(false);
  };

  let signal = {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: online ? "green" : "orange",
    color: online ? "green" : "orange",
    display: "inline-block",
  };

  useEffect(() => {
    window.addEventListener("online", setOnlineTrue);
    window.addEventListener("offline", setOnlineFalse);
    return () => {
      window.removeEventListener("online", setOnlineTrue);
      window.removeEventListener("offline", setOnlineFalse);
    };
  }, []);

  return (
    <p className="signal text-red-900">
      {" "}
      <span style={signal}></span> Internet
    </p>
  );
}

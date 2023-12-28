import React, { useEffect } from "react";

function Ping() {
  const [isOnline, setIsOnline] = React.useState("Offline");
  const [pingValue, setPingValue] = React.useState("N/A ms");

  useEffect(() => {
    var onlineStatusElement = document.getElementById("dot");
    function updatePingStatus(online: boolean, ping: string) {
      setIsOnline(online ? "Online" : "Offline");
      setPingValue(online ? ping + " ms" : "N/A ms");
      if (online) onlineStatusElement?.classList.add("online");
      if (!online) onlineStatusElement?.classList.remove("online");
    }

    const interval = setInterval(() => {
      console.log("pinging");
      fetch("/api/ssh/ping")
        .then((response) => response.json())
        .then((data) => {
          updatePingStatus(data.online, data.ping);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="status">
      <div id="dot"></div>
      <p id="pingStatus">
        <span id="onlineStatus">{isOnline}</span>
      </p>
      <p id="ping">
        <span id="pingValue">{pingValue}</span>
      </p>
    </div>
  );
}

export default Ping;

import React from "react";
import axios from "axios";

export default function Form({ setLogs }: { setLogs: any }) {
  const [command, setCommand] = React.useState("");

  const sendRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/ssh", { command });

      if (response.status === 200) {
        const data = response.data;
        setLogs(data.output || data.error || "Brak danych wyjściowych.");
      } else {
        setLogs("Błąd podczas wysyłania żądania SSH");
      }
    } catch (error) {
      console.error("Błąd:", error);
      setLogs("Błąd podczas komunikacji z serwerem.");
    }
  };

  return (
    <form id="ssh-form" onSubmit={sendRequest}>
      <div id="command-form">
        <label htmlFor="command">Enter SSH command:</label>
        <input
          type="text"
          id="command"
          name="command"
          required
          onChange={(e) => setCommand(e.target.value)}
        />
        <div className="buttony">
          <button type="submit">Execute</button>
        </div>
      </div>
    </form>
  );
}

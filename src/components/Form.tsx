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
    <form onSubmit={sendRequest}>
      <div className="flex flex-col items-center m-5">
        <label htmlFor="command" className="mb-[10px] text-[#bbe1fa]">
          Enter SSH command:
        </label>
        <input
          type="text"
          id="command"
          className="p-2 mb-[10px] text-black"
          required
          onChange={(e) => setCommand(e.target.value)}
        />
        <div>
          <button
            type="submit"
            className="p-[10px] bg-[#2f7a8f] text-white border-none rounded pointer hover:bg-[#347ba1] transition-all duration-300"
          >
            Execute
          </button>
        </div>
      </div>
    </form>
  );
}

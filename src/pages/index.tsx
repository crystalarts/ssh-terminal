import Background from "@/components/Background";
import Form from "@/components/Form";
import Output from "@/components/Output";
import Ping from "@/components/Ping";
import React from "react";

function Home() {
  const [logs, setLogs] = React.useState("");

  return (
    <>
      <div id="container">
        <div id="nav">
          <h1>SSH</h1>
          <Ping />
        </div>
        <Output logs={logs} />
        <Form setLogs={setLogs} />
      </div>
      <Background />
    </>
  );
}

export default Home;

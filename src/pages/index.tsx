import Background from "@/components/Background";
import Form from "@/components/Form";
import Output from "@/components/Output";
import Ping from "@/components/Ping";
import React from "react";

function Home() {
  const [logs, setLogs] = React.useState("");

  return (
    <>
      <div className="bg-[#1e2228] rounded-lg border border-[#464c5f] overflow-hidden w-[400px] relative z-50">
        <div className="flex justify-between items-center py-3 px-5 bg-[#1e2228] border-b-[1px] border-[#464c5f]">
          <h1 className="m-0 text-[#2c8199] text-3xl font-bold">SSH</h1>
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

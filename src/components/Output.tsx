import React from "react";

function Output({ logs }: { logs: any }) {
  return (
    <pre className="flex overflow-y-auto max-h-[200px] items-center justify-center px-[10px] py-5 whitespace-pre-wrap max-w-[300px] mx-0 my-auto">
      {logs}
    </pre>
  );
}

export default Output;

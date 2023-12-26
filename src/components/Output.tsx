import React from "react";

function Output({ logs }: { logs: any }) {
  return (
    <pre id="output" className="console">
      {logs}
    </pre>
  );
}

export default Output;

const express = require("express");
const { NodeSSH } = require("node-ssh");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const hostname = "0.0.0.0",
  port = 3000;

const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.static(__dirname));

const ssh = new NodeSSH();

const sshConfig = {
  host: "127.0.0.1",
  username: "majus",
  password: "",
};

(async () => {
  try {
    await ssh.connect(sshConfig);
    console.log("Connected to SSH server.");
  } catch (err) {
    console.error("Error connecting to SSH server:", err);
  }
})();

app.post("/ssh", async (req, res) => {
  const { command } = req.body;

  const fullCommand = `echo $USER@$HOST~ ${command}" && ${command}`;

  try {
    const result = await ssh.execCommand(fullCommand, [], {
      onStdout(chunk) {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(chunk.toString());
          }
        });
      },
      onStderr(chunk) {
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(chunk.toString());
          }
        });
      },
    });

    res.status(200).json({
      output: result.stdout,
      error: result.stderr,
    });
  } catch (err) {
    console.error("Error executing SSH command:", err);

    res.status(500).json({
      error: "Error executing SSH command.",
    });
  }
});

let lastPingTime = Date.now();

app.get("/ping", (req, res) => {
  const currentTime = Date.now();
  const ping = currentTime - lastPingTime;
  const online = ping < 1500;
  const stability = ping < 250 ? "No disruptions" : "Disruptions detected";

  lastPingTime = currentTime;

  res.json({
    online,
    ping,
    stability,
  });
});

wss.on("connection", (ws) => {
  console.log("New WebSocket client connected.");
  ws.on("close", () => {
    console.log("WebSocket client disconnected.");
  });
});

server.listen(port, hostname, () => {
  console.log(`SSH server is running on port http://${hostname}:${port}`);
});

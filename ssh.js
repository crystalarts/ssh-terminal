const express = require("express");
const { NodeSSH } = require("node-ssh");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const port = 80;

const wss = new WebSocket.Server({ server });

app.use(express.json());
app.use(express.static(__dirname));

const ssh = new NodeSSH();

const sshConfig = {
  host: "podaj nazwe/ip hosta",
  username: "podaj nazwe uzytkownika",
  password: "podaj haslo ssh",
};

ssh
  .connect(sshConfig)
  .then(() => {
    console.log("Połączono z serwerem SSH.");
  })
  .catch((err) => {
    console.error("Błąd połączenia z serwerem SSH:", err);
  });

app.post("/ssh", async (req, res) => {
  const { command } = req.body;

  const fullCommand = `echo "$USER@$HOST~ ${command}" && ${command}`;

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
    console.error("Błąd podczas wykonywania komendy SSH:", err);

    res.status(500).json({
      error: "Błąd podczas wykonywania komendy SSH.",
    });
  }
});

wss.on("connection", (ws) => {
  console.log("Nowy klient WebSocket połączony.");

  ws.on("close", () => {
    console.log("Klient WebSocket rozłączony.");
  });
});

app.listen(port, () => {
  console.log(`Serwer SSH działa na porcie ${port}`);
});

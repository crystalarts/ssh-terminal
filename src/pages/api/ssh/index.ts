import { NextApiRequest, NextApiResponse } from "next";
import { NodeSSH } from "node-ssh";
const ssh = new NodeSSH();

export var isOnline = false;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const sshConfig = {
      host: "",
      username: "",
      password: "",
    };

    if (isOnline == false) {
      try {
        await ssh.connect(sshConfig);
        console.log("Connected to SSH server.");
        isOnline = true;
      } catch (err) {
        console.error("Error connecting to SSH server:", err);
      }
    }

    const { command } = req.body;

    const fullCommand = `echo "${sshConfig.username}@${sshConfig.host}~ ${command}" && ${command}`;

    try {
      const result = await ssh.execCommand(fullCommand, {});

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
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

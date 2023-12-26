import { NextApiRequest, NextApiResponse } from "next";
import { isOnline } from "../index";

let lastPingTime = Date.now();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const currentTime = Date.now();
    const ping = currentTime - lastPingTime;
    const stability = ping < 250 ? "No disruptions" : "Disruptions detected";

    lastPingTime = currentTime;

    res.json({
      online: isOnline,
      ping,
      stability,
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

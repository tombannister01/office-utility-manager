import type { NextApiRequest, NextApiResponse } from "next";
import {
  Meeting,
  MeetingsResponse,
} from "../../../../../types/AvailabilityForce";

const userMeetings: Record<string, Record<string, Meeting[]>> = {
  user_a12f7d3e: {
    bldg_stanley_001: [
      {
        id: "mtg_24d8beef",
        roomId: "room_a1b2c3d4",
        roomName: "MR.0X",
        company: "ACME CORP",
        start: "2025-06-19T08:30:00Z",
        end: "2025-06-19T10:30:00Z",
      },
    ],
    bldg_harbor_002: [
      {
        id: "mtg_35g9h2k3",
        roomId: "room_i9j0k1l2",
        roomName: "MR.26",
        company: "INNOVATE LLC",
        start: "2025-06-20T11:00:00Z",
        end: "2025-06-20T12:00:00Z",
      },
    ],
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MeetingsResponse | { error: string }>
) {
  const { userId, buildingId } = req.query as {
    userId: string;
    buildingId: string;
  };

  const meetings = userMeetings[userId]?.[buildingId];
  if (!meetings) {
    return res
      .status(404)
      .json({ error: `No meetings found for ${userId} in ${buildingId}` });
  }

  res.status(200).json({ meetings });
}

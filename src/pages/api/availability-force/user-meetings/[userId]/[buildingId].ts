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
      {
        id: "mtg_11a2b3c4",
        roomId: "room_b2c3d4e5",
        roomName: "The Boardroom",
        company: "ACME CORP",
        start: "2025-06-19T11:00:00Z",
        end: "2025-06-19T12:00:00Z",
      },
      {
        id: "mtg_22b3c4d5",
        roomId: "room_c3d4e5f6",
        roomName: "Innovation Hub",
        company: "ACME CORP",
        start: "2025-06-19T13:00:00Z",
        end: "2025-06-19T14:00:00Z",
      },
      {
        id: "mtg_33c4d5e6",
        roomId: "room_d4e5f6g7",
        roomName: "MR.03",
        company: "ACME CORP",
        start: "2025-06-19T15:00:00Z",
        end: "2025-06-19T16:00:00Z",
      },
      {
        id: "mtg_44d5e6f7",
        roomId: "room_e5f6g7h8",
        roomName: "Sunrise Suite",
        company: "ACME CORP",
        start: "2025-06-19T16:30:00Z",
        end: "2025-06-19T17:30:00Z",
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
      {
        id: "mtg_55m6n7o8",
        roomId: "room_m5n6o7p8",
        roomName: "The Loft",
        company: "INNOVATE LLC",
        start: "2025-06-20T12:30:00Z",
        end: "2025-06-20T13:30:00Z",
      },
      {
        id: "mtg_66n7o8p9",
        roomId: "room_n6o7p8q9",
        roomName: "MR.12",
        company: "INNOVATE LLC",
        start: "2025-06-20T14:00:00Z",
        end: "2025-06-20T15:00:00Z",
      },
      {
        id: "mtg_77o8p9q0",
        roomId: "room_o7p8q9r0",
        roomName: "Skyline Room",
        company: "INNOVATE LLC",
        start: "2025-06-20T15:30:00Z",
        end: "2025-06-20T16:30:00Z",
      },
      {
        id: "mtg_88p9q0r1",
        roomId: "room_p8q9r0s1",
        roomName: "MR.04",
        company: "INNOVATE LLC",
        start: "2025-06-20T17:00:00Z",
        end: "2025-06-20T18:00:00Z",
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

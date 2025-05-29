import type { NextApiRequest, NextApiResponse } from "next";
import { Issue } from "../../../../types/IssueForce";

const meetingRoomIssues: Record<string, Issue[]> = {
  bldg_stanley_001: [
    {
      id: "tick_9001a",
      roomId: "room_a1b2c3d4",
      roomName: "MR.0X",
      title: "Leaking AC",
      status: "open",
      createdAt: "2025-06-17T12:00:00Z",
    },
    {
      id: "tick_9001b",
      roomId: "room_e5f6g7h8",
      roomName: "MR.1A",
      title: "Loose power socket",
      status: "resolved",
      createdAt: "2025-06-18T10:00:00Z",
    },
  ],
  bldg_harbor_002: [
    {
      id: "tick_9002a",
      roomId: "room_i9j0k1l2",
      roomName: "MR.12",
      title: "Projector not working",
      status: "in_progress",
      createdAt: "2025-06-18T09:00:00Z",
    },
    {
      id: "tick_9002b",
      roomId: "room_m3n4o5p6",
      roomName: "MR.14",
      title: "Aircon rattling",
      status: "open",
      createdAt: "2025-06-19T08:15:00Z",
    },
  ],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Issue[] | { error: string }>
) {
  const { buildingId } = req.query as { buildingId: string };
  const issues = meetingRoomIssues[buildingId];
  if (!issues) {
    return res
      .status(404)
      .json({ error: `No issues found for building ${buildingId}` });
  }

  res.status(200).json(issues);
}

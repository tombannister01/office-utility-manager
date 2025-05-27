import type { NextApiRequest, NextApiResponse } from "next";

export interface Viewing {
  id: string;
  unit: string;
  company: string;
  datetime: string;
}

export interface MoveInOut {
  id: string;
  unit: string;
  company: string;
  datetime: string;
}

export interface UpcomingEventsResponse {
  viewings: Viewing[];
  moveInOut: MoveInOut[];
}

const dataByUser: Record<string, UpcomingEventsResponse> = {
  user_a12f7d3e: {
    viewings: [
      {
        id: "view_2f8b901a",
        unit: "01.0X",
        company: "MEGA CORP",
        datetime: "2025-06-19T14:30:00Z",
      },
    ],
    moveInOut: [
      {
        id: "mov_4e2c9f76",
        unit: "01.0X",
        company: "UBER CO",
        datetime: "2025-06-19T09:00:00Z",
      },
    ],
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UpcomingEventsResponse | { error: string }>
) {
  const { userId } = req.query as { userId: string };
  const data = dataByUser[userId];
  if (!data) {
    return res.status(404).json({ error: `No events for user ${userId}` });
  }
  res.status(200).json(data);
}

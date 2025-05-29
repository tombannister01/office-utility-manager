import type { NextApiRequest, NextApiResponse } from "next";
import { UpcomingEventsResponse } from "../../../../types/CustomerForce";

const dataByUser: Record<string, UpcomingEventsResponse> = {
  user_a12f7d3e: {
    viewings: [
      {
        id: "view_2f8b901a",
        unit: "01.0X",
        company: "MEGA CORP",
        datetime: "2025-06-19T14:30:00Z",
      },
      {
        id: "view_3c7d812b",
        unit: "02.12",
        company: "ALPHA INC",
        datetime: "2025-06-20T10:00:00Z",
      },
      {
        id: "view_4e9f123c",
        unit: "03.07",
        company: "OMEGA GROUP",
        datetime: "2025-06-21T16:00:00Z",
      },
    ],
    moveInOut: [
      {
        id: "mov_4e2c9f76",
        unit: "01.0X",
        company: "UBER CO",
        datetime: "2025-06-19T09:00:00Z",
      },
      {
        id: "mov_5f3d0a87",
        unit: "02.12",
        company: "ALPHA INC",
        datetime: "2025-06-20T15:00:00Z",
      },
      {
        id: "mov_6g4e1b98",
        unit: "03.07",
        company: "OMEGA GROUP",
        datetime: "2025-06-21T11:00:00Z",
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

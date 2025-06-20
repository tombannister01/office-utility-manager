import type { NextApiRequest, NextApiResponse } from "next";
import type { Building } from "../../../../types/General";

type ErrorResponse = { error: string };

const userBuildings: Record<string, Building[]> = {
  user_a12f7d3e: [
    { id: "bldg_stanley_001", name: "Stanley Building" },
    { id: "bldg_harbor_002", name: "Harbor Tower" },
  ],
};
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Building[] | ErrorResponse>
) {
  const { userId } = req.query as { userId: string };
  const buildings = userBuildings[userId];
  if (!buildings) {
    return res
      .status(404)
      .json({ error: `No buildings found for user ${userId}` });
  }
  res.status(200).json(buildings);
}

import type { NextApiRequest, NextApiResponse } from "next";

export interface User {
  id: string;
  name: string;
}

const users: Record<string, User> = {
  user_a12f7d3e: { id: "user_a12f7d3e", name: "Joe Bloggs" },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const userId = req.headers["x-user-id"] as string;
  const user = users[userId] || users["user_a12f7d3e"];
  res.status(200).json(user);
}

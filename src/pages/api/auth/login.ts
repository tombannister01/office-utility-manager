// pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";

export interface User {
  id: string;
  name: string;
}

const user: User = {
  id: "user_a12f7d3e",
  name: "Joe Bloggs",
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  // Always return the mock user, no query needed
  res.status(200).json(user);
}

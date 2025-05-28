import type { NextApiRequest, NextApiResponse } from "next";
import { Room, RoomsResponse } from "../../../../types/AvailabilityForce";

const roomsPerBuilding: Record<string, Room[]> = {
  bldg_stanley_001: [
    {
      id: "room_a1b2c3d4",
      roomName: "MR.0X",
      capacity: 6,
      price: 100,
      features: ["TV", "Whiteboard"],
      isAvailable: false,
      imgUrl: "/images/rooms/mr_0x.jpg",
    },
    {
      id: "room_e5f6g7h8",
      roomName: "MR.1A",
      capacity: 10,
      price: 200,
      features: ["Projector"],
      isAvailable: true,
      imgUrl: "/images/rooms/mr_1a.jpg",
    },
  ],
  bldg_harbor_002: [
    {
      id: "room_i9j0k1l2",
      roomName: "MR.12",
      capacity: 8,
      price: 80,
      features: ["Video Conferencing"],
      isAvailable: false,
      imgUrl: "/images/rooms/mr_12.jpg",
    },
    {
      id: "room_m3n4o5p6",
      roomName: "MR.14",
      capacity: 4,
      price: 150,
      features: [],
      isAvailable: true,
      imgUrl: "/images/rooms/mr_14.jpg",
    },
  ],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RoomsResponse | { error: string }>
) {
  const { buildingId } = req.query as { buildingId: string };
  const rooms = roomsPerBuilding[buildingId];
  if (!rooms) {
    return res
      .status(404)
      .json({ error: `No rooms found for building ${buildingId}` });
  }
  res.status(200).json({ rooms });
}

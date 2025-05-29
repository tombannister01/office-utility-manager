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
      imgUrl: "/images/rooms/mr_0X.webp",
    },
    {
      id: "room_e5f6g7h8",
      roomName: "MR.1A",
      capacity: 10,
      price: 150,
      features: ["Projector"],
      isAvailable: true,
      imgUrl: "/images/rooms/mr_1A.webp",
    },
    {
      id: "room_edbdhgd5",
      roomName: "MR.1B",
      capacity: 15,
      price: 200,
      features: ["TV", "Whiteboard"],
      isAvailable: true,
      imgUrl: "/images/rooms/mr_1B.webp",
    },
    {
      id: "room_ferf387hf3",
      roomName: "MR.02",
      capacity: 20,
      price: 400,
      features: ["Video Conferencing"],
      isAvailable: true,
      imgUrl: "/images/rooms/mr_02.webp",
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
      imgUrl: "/images/rooms/mr_12.webp",
    },
    {
      id: "room_fuhef387fh3",
      roomName: "MR.14",
      capacity: 4,
      price: 60,
      features: ["Video Conferencing"],
      isAvailable: true,
      imgUrl: "/images/rooms/mr_14.webp",
    },
    {
      id: "room_wefwef8i8",
      roomName: "MR.11",
      capacity: 8,
      price: 100,
      features: [],
      isAvailable: true,
      imgUrl: "/images/rooms/mr_11.webp",
    },
    {
      id: "room_wewkje72",
      roomName: "MR.05",
      capacity: 10,
      price: 200,
      features: [],
      isAvailable: true,
      imgUrl: "/images/rooms/mr_05.webp",
    },
    {
      id: "room_laksjd8f7",
      roomName: "MR.07",
      capacity: 10,
      price: 120,
      features: [],
      isAvailable: true,
      imgUrl: "/images/rooms/mr_07.webp",
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

import { useQuery } from "@tanstack/react-query";
import { useUI } from "../context/UIContext";
import type { Room } from "../types/AvailabilityForce";

export function useRooms() {
  const { selectedBuilding } = useUI();

  return useQuery<Room[]>({
    queryKey: ["rooms", selectedBuilding],
    enabled: !!selectedBuilding,
    queryFn: async () => {
      const res = await fetch(
        `/api/availability-force/meeting-rooms/${selectedBuilding}`,
        { cache: "no-store" }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch rooms");
      }
      const data: { rooms: Room[] } = await res.json();
      return data.rooms;
    },
  });
}

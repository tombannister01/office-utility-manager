import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useUI } from "../context/UIContext";
import type { Meeting } from "../types/AvailabilityForce";

export function useMeetings() {
  const { user } = useAuth();
  const { selectedBuilding } = useUI();

  return useQuery<Meeting[]>({
    queryKey: ["meetings", user?.id, selectedBuilding],
    enabled: !!user && !!selectedBuilding,
    queryFn: async () => {
      const res = await fetch(
        `/api/availability-force/user-meetings/${
          user!.id
        }/${selectedBuilding!}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch meetings");
      const data: { meetings: Meeting[] } = await res.json();
      return data.meetings;
    },
  });
}

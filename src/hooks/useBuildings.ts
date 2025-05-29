import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import type { Building } from "../types/General";

export function useBuildings() {
  const { user } = useAuth();

  return useQuery<Building[]>({
    queryKey: ["buildings", user?.id],
    queryFn: async () => {
      const res = await fetch(`/api/user/buildings/${user!.id}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch buildings");
      return res.json();
    },
    enabled: !!user,
  });
}

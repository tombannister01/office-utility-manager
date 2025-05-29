import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export function useUpcoming() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["upcoming", user?.id],
    queryFn: () =>
      fetch(`/api/customer-force/upcoming-events/${user!.id}`).then((r) =>
        r.json()
      ),
    enabled: !!user,
  });
}

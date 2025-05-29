import { useQuery } from "@tanstack/react-query";
import { useUI } from "../context/UIContext";
import type { Issue } from "../types/IssueForce";

export function useIssues() {
  const { selectedBuilding, issuesDrawerOpened } = useUI();

  return useQuery<Issue[], Error>({
    queryKey: ["issues", selectedBuilding],
    enabled: !!selectedBuilding && issuesDrawerOpened,
    initialData: [],
    queryFn: async () => {
      const res = await fetch(
        `/api/issue-force/meeting-room-issues/${selectedBuilding}`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch issues");
      return (await res.json()) as Issue[];
    },
  });
}

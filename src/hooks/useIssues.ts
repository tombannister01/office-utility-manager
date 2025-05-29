import { useQuery } from "@tanstack/react-query";
import { useUI } from "../context/UIContext";
import { Issue } from "../types/IssueForce";

export function useIssues() {
  const { selectedBuilding, issuesDrawerOpened } = useUI();
  return useQuery({
    queryKey: ["issues", selectedBuilding],
    queryFn: () =>
      fetch(`/api/issue-force/meeting-room-issues/${selectedBuilding}`).then(
        (r) => r.json()
      ),
    enabled: !!selectedBuilding && issuesDrawerOpened,
    select: (data: { tickets: Issue[] }) => data.tickets,
  });
}

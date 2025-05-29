import { createContext, useContext, useState } from "react";

interface UIContextValue {
  selectedBuilding: string | null;
  setSelectedBuilding(id: string): void;
  issuesDrawerOpened: boolean;
  openIssuesDrawer(): void;
  closeIssuesDrawer(): void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: React.PropsWithChildren<object>) {
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [issuesDrawerOpened, setIssuesDrawerOpened] = useState(false);
  return (
    <UIContext.Provider
      value={{
        selectedBuilding,
        setSelectedBuilding,
        issuesDrawerOpened,
        openIssuesDrawer: () => setIssuesDrawerOpened(true),
        closeIssuesDrawer: () => setIssuesDrawerOpened(false),
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const context = useContext(UIContext);

  if (!context) throw new Error("useUI must be inside UIProvider");
  const setBuilding = (building: string) => {
    localStorage.setItem("building", building)
    context.setSelectedBuilding(building);
  }
  return { selectedBuilding: context.selectedBuilding, setSelectedBuilding: setBuilding };
};

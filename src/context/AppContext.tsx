"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, Building } from "../types/General";
import type { Meeting } from "../types/AvailabilityForce";
import type { Room } from "../types/AvailabilityForce";
import type { Issue } from "../types/IssueForce";
import type { UpcomingEventsResponse } from "../types/CustomerForce";

interface AppContextValue {
  user: User | null;
  buildings: Building[];
  selectedBuilding: string | null;
  setSelectedBuilding: (id: string) => void;
  meetings: Meeting[] | null;
  rooms: Room[] | null;
  upcoming: UpcomingEventsResponse | null;
  issues: Issue[] | null;
  openIssuesDrawer: () => void;
  closeIssuesDrawer: () => void;
  issuesDrawerOpened: boolean;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, _setSelectedBuilding] = useState<string | null>(null);

  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [rooms, setRooms] = useState<Room[] | null>(null);

  const [upcoming, setUpcoming] = useState<UpcomingEventsResponse | null>(null);
  const [issues, setIssues] = useState<Issue[] | null>(null);
  const [issuesDrawerOpened, setIssuesDrawerOpened] = useState(false);

  // 1️⃣ load user once
  useEffect(() => {
    fetch("/api/auth/login", { cache: "no-store" })
      .then((r) => r.json())
      .then(setUser);
  }, []);

  // 2️⃣ load buildings once user is ready
  useEffect(() => {
    if (!user) return;
    fetch(`/api/user/buildings/${user.id}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setBuildings(d.buildings);
        if (d.buildings.length) _setSelectedBuilding(d.buildings[0].id);
      });
  }, [user]);

  // 3️⃣ fetch rooms when selectedBuilding changes
  useEffect(() => {
    if (!selectedBuilding) return setRooms(null);
    fetch(`/api/availability-force/meeting-rooms/${selectedBuilding}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((d: { rooms: Room[] }) => setRooms(d.rooms))
      .catch(() => setRooms([]));
  }, [selectedBuilding]);

  // 4️⃣ load meetings when selectedBuilding or user changes
  useEffect(() => {
    if (!user || !selectedBuilding) return setMeetings(null);
    fetch(
      `/api/availability-force/user-meetings/${user.id}/${selectedBuilding}`,
      { cache: "no-store" }
    )
      .then((r) => r.json())
      .then((d: { meetings: Meeting[] }) => setMeetings(d.meetings))
      .catch(() => setMeetings([]));
  }, [user, selectedBuilding]);

  // 5️⃣ load upcoming events once user ready
  useEffect(() => {
    if (!user) return setUpcoming(null);
    fetch(`/api/customer-force/upcoming-events/${user.id}`, {
      cache: "no-store",
    })
      .then((r) => r.json())
      .then(setUpcoming)
      .catch(() => setUpcoming(null));
  }, [user]);

  // 6️⃣ load issues when drawer opens
  useEffect(() => {
    if (!issuesDrawerOpened || !selectedBuilding) return setIssues(null);
    fetch(`/api/issue-force/meeting-room-issues/${selectedBuilding}`, {
      cache: "no-store",
    })

      .then((r) => r.json())
      .then((d: Issue[]) => setIssues(d))
      .catch(() => setIssues([]));
  }, [issuesDrawerOpened, selectedBuilding]);

  const setSelectedBuilding = (id: string) => {
    _setSelectedBuilding(id);
  };
  const openIssuesDrawer = () => setIssuesDrawerOpened(true);
  const closeIssuesDrawer = () => setIssuesDrawerOpened(false);

  return (
    <AppContext.Provider
      value={{
        user,
        buildings,
        selectedBuilding,
        setSelectedBuilding,
        meetings,
        rooms,
        upcoming,
        issues,
        issuesDrawerOpened,
        openIssuesDrawer,
        closeIssuesDrawer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppProvider");
  return ctx;
}

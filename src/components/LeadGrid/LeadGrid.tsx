"use client";

import { useState, useEffect } from "react";
import {
  Container,
  SimpleGrid,
  Card,
  Text,
  Loader,
  Group,
  Badge,
} from "@mantine/core";
import { BuildingDropdown, Building } from "../BuildingSelect";
import type { User } from "../../types/General";
import type { Meeting } from "../../types/AvailabilityForce";



export function LeadGrid({ user }: { user: User }) {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [loadingBuildings, setLoadingBuildings] = useState(true);

  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);

  useEffect(() => {
    setLoadingBuildings(true);
    fetch(`/api/user/buildings/${user.id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setBuildings(data.buildings);
        if (data.buildings.length > 0) {
          setSelectedBuilding(data.buildings[0].id);
        }
      })
      .finally(() => setLoadingBuildings(false));
  }, [user.id]);

  useEffect(() => {
    if (!selectedBuilding) return;
    setLoadingMeetings(true);
    fetch(
      `/api/availability-force/user-meetings/${user.id}/${selectedBuilding}`,
      { cache: "no-store" }
    )
      .then((res) => res.json())
      .then((data: { meetings: Meeting[] }) => setMeetings(data.meetings))
      .finally(() => setLoadingMeetings(false));
  }, [user.id, selectedBuilding]);


  return (
    <Container my="md" fluid>
      <Text mb="md">Hey, {user.name}</Text>

      <BuildingDropdown
        buildings={buildings}
        value={selectedBuilding}
        onChange={setSelectedBuilding}
        loading={loadingBuildings}
      />

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="lg">
        <SimpleGrid cols={1} spacing="md">
          {loadingMeetings ? (
            <Loader />
          ) : meetings.length > 0 ? (
            meetings.map((meeting) => (
              <Card key={meeting.id} shadow="sm" p="lg" radius="md" withBorder>
                <Group justify="space-between" mb="sm">
                  <Text fw={600}>{meeting.roomName}</Text>
                  <Badge>{meeting.company}</Badge>
                </Group>
                <Text size="sm" c="dimmed">
                  {new Date(meeting.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {new Date(meeting.end).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Card>
            ))
          ) : (
            <Text c="dimmed">No meetings for this building.</Text>
          )}
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
}

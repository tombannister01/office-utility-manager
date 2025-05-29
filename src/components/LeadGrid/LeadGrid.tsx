"use client";

import {
  Container,
  SimpleGrid,
  Card,
  Text,
  Loader,
  Group,
  Stack,
  Title,
  Divider,
} from "@mantine/core";
import { useMeetings } from "../../hooks/useMeetings";
import { useUpcoming } from "../../hooks/useUpcoming";
import { useAuth } from "../../context/AuthContext";
import { useUI } from "../../context/UIContext";
import { Meeting } from "../../types/AvailabilityForce";
import { Viewing } from "../../types/CustomerForce";
import { MoveInOut } from "../../types/CustomerForce";

export function LeadGrid() {
  const { user, isLoading: authLoading } = useAuth();
  const { selectedBuilding } = useUI();
  const {
    data: meetings,
    isLoading: loadingMeetings,
  } = useMeetings();
  const {
    data: upcoming,
    isLoading: loadingUpcoming,
  } = useUpcoming();


  if (authLoading) {
    return (
      <Container my="md" fluid>
        <Loader />
      </Container>
    );
  }

  return (
    <Container my="md" fluid>
      <Text mb="md" size="xl" fw={700}>
        Hey, {user!.name}
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="lg">
        {/* Column 1: Meetings */}
        <Stack gap="md">
          <Title order={4}>Meetings</Title>
          {loadingMeetings ? (
            <Loader />
          ) : meetings && meetings.length > 0 ? (
            meetings.map((m: Meeting) => (
              <Card key={m.id} shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={600}>
                    {m.roomName} – {m.company}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {new Date(m.start).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {new Date(m.end).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Card>
            ))
          ) : (
            <Text c="dimmed">
              {selectedBuilding
                ? "No meetings for this building."
                : "Select a building above."}
            </Text>
          )}
        </Stack>

        {/* Column 2: Viewings & Move in/out */}
        <Stack gap="md">
          <Title order={4}>Viewings</Title>
          {loadingUpcoming ? (
            <Loader />
          ) : upcoming && upcoming.viewings.length > 0 ? (
            upcoming.viewings.map((v: Viewing) => (
              <Card key={v.id} shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={600}>
                    {v.unit} – {v.company}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {new Date(v.datetime).toLocaleString(undefined, {
                    weekday: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
              </Card>
            ))
          ) : (
            <Text c="dimmed">No viewings scheduled.</Text>
          )}

          <Divider my="sm" />

          <Title order={4}>Move in/out</Title>
          {loadingUpcoming ? (
            <Loader />
          ) : upcoming && upcoming.moveInOut.length > 0 ? (
            upcoming.moveInOut.map((m: MoveInOut) => (
              <Card key={m.id} shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={600}>
                    {m.unit} – {m.company}
                  </Text>
                </Group>
                <Text size="sm" c="dimmed">
                  {new Date(m.datetime).toLocaleString(undefined, {
                    weekday: "short",
                    day: "numeric",
                  })}
                </Text>
              </Card>
            ))
          ) : (
            <Text c="dimmed">No move-ins/outs scheduled.</Text>
          )}
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

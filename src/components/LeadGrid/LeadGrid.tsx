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
import { useAppContext } from "../../context/AppContext";

export function LeadGrid() {
  const {
    user,
    selectedBuilding,
    meetings,
    upcoming,
  } = useAppContext();

  if (!user) return <Loader />;

  return (
    <Container my="md" fluid>
      <Text mb="md" size="xl" fw={700}>Hey, {user.name}</Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md" mt="lg">
        {/* Column 1: Meetings */}
        <Stack gap="md">
          <Title order={4}>Meetings</Title>
          {meetings === null ? (
            <Loader />
          ) : meetings.length > 0 ? (
            meetings.map((m) => (
              <Card key={m.id} shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={600}>{m.roomName} - {m.company}</Text>
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
              {selectedBuilding ? "No meetings for this building." : "Select a building above."}
            </Text>
          )}
        </Stack>

        {/* Column 2: Upcoming Events */}
        <Stack gap="md">
          <Title order={4}>Viewings</Title>
          {upcoming === null ? (
            <Loader />
          ) : upcoming.viewings.length > 0 ? (
            upcoming.viewings.map((v) => (
              <Card key={v.id} shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={600}>{v.unit} - {v.company}</Text>
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

          {/* Column 3: Move in/out */}

          <Title order={4}>Move in/out</Title>
          {upcoming === null ? (
            <Loader />
          ) : upcoming.moveInOut.length > 0 ? (
            upcoming.moveInOut.map((m) => (
              <Card key={m.id} shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text fw={600}>{m.unit} - {m.company}</Text>
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
            <Text c="dimmed">No move‐ins/outs scheduled.</Text>
          )}
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

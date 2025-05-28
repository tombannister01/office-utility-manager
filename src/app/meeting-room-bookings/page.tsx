"use client";

import { Container, SimpleGrid, Card, Text, Loader, Box } from "@mantine/core";
import { useAppContext } from "../../context/AppContext";

export default function MeetingRoomBookings() {
  const { selectedBuilding, rooms } = useAppContext();

  if (!selectedBuilding) {
    return (
      <Container my="md" fluid>
        <Text c="dimmed">Please select a building to view rooms.</Text>
      </Container>
    );
  }

  if (rooms === null) {
    return (
      <Container my="md" fluid>
        <Loader />
      </Container>
    );
  }

  return (
    <Container my="md" fluid>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {rooms.length > 0 ? (
          rooms.map((r) => (
            <Card key={r.id} shadow="sm" p="lg" radius="md" withBorder>
              <Text fw={600}>{r.roomName}</Text>
              <Box mt="sm">
                <Text size="sm" c="dimmed">
                  Capacity: {r.capacity}
                </Text>
                <Text size="sm" c="dimmed">
                  Price: £{r.price}
                </Text>
              </Box>
            </Card>
          ))
        ) : (
          <Text c="dimmed">No rooms available for this building.</Text>
        )}
      </SimpleGrid>
    </Container>
  );
}

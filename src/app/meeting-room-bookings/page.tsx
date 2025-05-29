'use client';

import {
  Container,
  SimpleGrid,
  Card,
  Text,
  Loader,
  Box,
  Title,
  Button,
  Group,
} from '@mantine/core';
import Image from 'next/image';
import {
  IconUsers,
  IconCurrencyPound,
} from '@tabler/icons-react';
import { useUI } from '../../context/UIContext';
import { useRooms } from '../../hooks/useRooms';
import type { Room } from '../../types/AvailabilityForce';

export default function MeetingRoomBookings() {
  const { selectedBuilding } = useUI();
  const { data: rooms, isLoading: loadingRooms } = useRooms();

  if (!selectedBuilding) {
    return (
      <Container my="md" fluid>
        <Text c="dimmed">Please select a building to view rooms.</Text>
      </Container>
    );
  }

  if (loadingRooms || rooms === null) {
    return (
      <Container my="md" fluid>
        <Loader />
      </Container>
    );
  }
  const availableRooms = (rooms ?? []).filter((r) => r.isAvailable);

  return (
    <Container my="md" fluid>
      <Box mb="xl">
        <Title order={2} mb="xs">
          Meeting Room Bookings
        </Title>
        <Text size="sm" c="dimmed">
          Live Availability
        </Text>
      </Box>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {availableRooms.length > 0 ? (
          availableRooms.map((r: Room) => (
            <Card key={r.id} shadow="none" radius="md" withBorder>
              <Card.Section>
                <Box
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: 0,
                    paddingBottom: '56%',
                    backgroundColor: 'var(--mantine-color-gray-0)',
                  }}
                >
                  <Image
                    src={r.imgUrl && r.imgUrl.trim() ? r.imgUrl : '/images/rooms/placeholder.webp'}
                    alt={r.roomName}
                    fill
                    style={{
                      objectFit: 'cover',
                      borderTopLeftRadius: 4,
                      borderTopRightRadius: 4,
                    }}
                  />
                </Box>
              </Card.Section>

              <Text fw={600} mt="sm">
                {r.roomName}
              </Text>

              <Group gap="xl" mt="xs">
                <Group gap={4} align="center">
                  <IconUsers size={18} stroke={2} />
                  <Text size="sm">{r.capacity}</Text>
                </Group>
                <Group gap={4} align="center">
                  <IconCurrencyPound size={18} stroke={2} />
                  <Text size="sm">{r.price}</Text>
                </Group>
              </Group>

              <Box mt="md" style={{ textAlign: 'right' }}>
                <Button
                  size="xs"
                  variant="filled"
                  radius="xl"
                  color="blue"
                >
                  Available
                </Button>
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

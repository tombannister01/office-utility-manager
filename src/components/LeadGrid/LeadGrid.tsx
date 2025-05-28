import { Container, SimpleGrid, Skeleton } from '@mantine/core';
import { User } from '../../types/General';


export function LeadGrid({ user }: { user: User }) {
  const PRIMARY_COL_HEIGHT = "100vh";
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md" fluid>
      Hey, {user.name}
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">

        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />

        <SimpleGrid cols={1} spacing="md">
          <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Container>
  );
}


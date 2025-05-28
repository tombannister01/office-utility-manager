"use client";

import { Drawer, Button, Stack, Loader, Text, Card, Group, Box } from "@mantine/core";
import { format } from "date-fns";
import { useAppContext } from "../../context/AppContext";
import classes from "../styles/Navbar.module.css";

export function RightNavbar() {
  const {
    issues,
    issuesDrawerOpened,
    openIssuesDrawer,
    closeIssuesDrawer,
  } = useAppContext();

  return (
    <>
      <Drawer
        opened={issuesDrawerOpened}
        onClose={closeIssuesDrawer}
        title="Room Issues"
        padding="md"
        position="right"
        size="sm"
      >
        {issues === null ? (
          <Loader />
        ) : issues.length === 0 ? (
          <Text>No issues</Text>
        ) : (
          <Stack gap="md">
            {issues.map((i) => (
              <Card
                key={i.id}
                withBorder
                radius="md"
                p="md"
                style={{ backgroundColor: "#fff" }}
              >
                {/* Room & timestamp */}
                <Group justify="space-between" align="center" gap="xs">
                  <Text fw={600}>{i.roomName}</Text>
                  <Text size="xs" c="dimmed">
                    {format(new Date(i.createdAt), "MMM d, yyyy • h:mm a")}
                  </Text>
                </Group>

                {/* Title */}
                <Text mt="xs" mb="xs">
                  {i.title}
                </Text>

                {/* Status */}
                <Box>
                  <Text size="sm" c={i.status === "open" ? "red" : "green"}>
                    {i.status.replace("_", " ")}
                  </Text>
                </Box>
              </Card>
            ))}
          </Stack>
        )}
      </Drawer>

      {/* Use the exact same classes as LeftNavbar */}
      <nav className={`${classes.navbarBase} ${classes.navbarRight}`}>
        <Stack gap="md" align="center" justify="center">
          <Button onClick={openIssuesDrawer} variant="outline" size="sm">
            Issues
          </Button>
        </Stack>
      </nav>
    </>
  );
}

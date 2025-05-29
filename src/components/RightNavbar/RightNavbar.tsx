"use client";

import {
  Drawer,
  Stack,
  Loader,
  Text,
  Card,
  Group,
  Box,
  UnstyledButton,
} from "@mantine/core";
import { IconTag, TablerIcon } from "@tabler/icons-react";
import { format } from "date-fns";
import { useAppContext } from "../../context/AppContext";
import classes from "../styles/Navbar.module.css";


const navItems: Array<{
  Icon: TablerIcon;
  label: string;
  action: () => void;
}> = [
    { Icon: IconTag, label: "View issues", action: () => { } },
  ];

export function RightNavbar() {
  const {
    issues,
    issuesDrawerOpened,
    openIssuesDrawer,
    closeIssuesDrawer,
  } = useAppContext();

  navItems[0].action = openIssuesDrawer;

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
        {issuesDrawerOpened && issues === null ? (
          <Loader />
        ) : issues && issues.length === 0 ? (
          <Text>No issues</Text>
        ) : (
          <Stack gap="md">
            {issues?.map((i) => (
              <Card
                key={i.id}
                withBorder
                radius="md"
                p="md"
                style={{ backgroundColor: "#fff" }}
              >
                <Group justify="space-between" align="center" gap="xs">
                  <Text fw={600}>{i.roomName}</Text>
                  <Text size="xs" c="dimmed">
                    {format(new Date(i.createdAt), "MMM d, yyyy • h:mm a")}
                  </Text>
                </Group>

                <Text mt="xs" mb="xs">
                  {i.title}
                </Text>

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

      <nav className={`${classes.navbarBase} ${classes.navbarRight}`}>
        <Stack justify="center" align="center" gap="md">
          {navItems.map(({ Icon, label, action }) => (
            <UnstyledButton
              key={label}
              onClick={action}
              className={classes.link}
              aria-label={label}
            >
              <Icon stroke={2} size={24} />
            </UnstyledButton>
          ))}
        </Stack>
      </nav>
    </>
  );
}

"use client";

import { Drawer, Button, Stack, Loader, Text } from "@mantine/core";
import { useAppContext } from "../../context/AppContext";
import classes from "../styles/Navbar.module.css";

export function RightNavbar() {
  const { issues, issuesDrawerOpened, openIssuesDrawer, closeIssuesDrawer } =
    useAppContext();

  return (
    <>
      <Drawer
        opened={issuesDrawerOpened}
        onClose={closeIssuesDrawer}
        title="Room Issues"
        padding="md"
        position="right"
      >
        {issues === null ? (
          <Loader />
        ) : issues.length ? (
          issues.map((i) => (
            <Text key={i.id}>
              {i.roomName}: {i.title} ({i.status})
            </Text>
          ))
        ) : (
          <Text>No issues</Text>
        )}
      </Drawer>

      <nav className={`${classes.navbarBase} ${classes.navbarRight}`}>
        <Stack justify="center" align="center">
          <Button onClick={openIssuesDrawer} variant="outline" size="sm">
            Issues
          </Button>
        </Stack>
      </nav>
    </>
  );
}

import { Button, Stack, } from "@mantine/core";
import classes from "../styles/Navbar.module.css";

export function RightNavbar() {


  return (
    <nav className={`${classes.navbarBase} ${classes.navbarRight}`}>
      <Stack justify="center" gap={16}>
        <Button
        >
        </Button>

      </Stack>
    </nav>
  );
}

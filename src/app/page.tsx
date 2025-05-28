import { Box } from "@mantine/core";
import { NavbarMinimal } from "../components/NavbarMinimal/NavbarMinimal";
import { LeadGrid } from "../components/LeadGrid/LeadGrid";

export default function Home() {
  return (
    <>
      <NavbarMinimal />

      <Box
        style={{
          // equal to .navbar width
          marginLeft: 80,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "var(--mantine-color-gray-0)",
        }}
      >
        <Box
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "var(--mantine-spacing-md)",
          }}
        >
          <LeadGrid />
        </Box>
      </Box>
    </>
  );
}

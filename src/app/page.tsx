import { Box } from "@mantine/core";
import { LeftNavbar } from "../components/LeftNavbar/LeftNavbar";
import { RightNavbar } from "../components/RightNavbar/RightNavbar";
import { LeadGrid } from "../components/LeadGrid/LeadGrid";

export default function Home() {
  return (
    <>
      <LeftNavbar />
      <RightNavbar />
      <Box
        style={{
          marginLeft: 80,
          marginRight: 80,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            height: "100%",
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

import { Box } from "@mantine/core";
import { LeftNavbar } from "../components/LeftNavbar/LeftNavbar";
import { RightNavbar } from "../components/RightNavbar/RightNavbar";
import { LeadGrid } from "../components/LeadGrid/LeadGrid";


export default async function Home() {
  const res = await fetch("http://localhost:3000/api/auth/login", {
    headers: { "x-user-id": "user_a12f7d3e" },
    cache: "no-store"
  });

  const user = await res.json();
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
          <LeadGrid user={user} />
        </Box>
      </Box>
    </>
  );
}

"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Box,
  Loader,
} from "@mantine/core";
import { AppProvider, useAppContext } from "../context/AppContext";
import { LeftNavbar } from "../components/LeftNavbar/LeftNavbar";
import { RightNavbar } from "../components/RightNavbar/RightNavbar";
import { BuildingDropdown } from "../components/BuildingSelect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



function LayoutContent({ children }: { children: React.ReactNode }) {
  const {
    buildings,
    selectedBuilding,
    setSelectedBuilding,
    user,
  } = useAppContext();

  // while loading buildings or user, show a full‐screen loader
  if (!user || buildings.length === 0) {
    return (
      <Box
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader size="lg" />
      </Box>
    );
  }

  return (
    <>
      <LeftNavbar />

      {/* Top‐right building selector */}
      <Box
        style={{
          position: "fixed",
          top: 0,
          right: 130,
          padding: "var(--mantine-spacing-md)",
          backgroundColor: "#fff",
          zIndex: 5,
          width: 200,
        }}
      >
        <BuildingDropdown
          buildings={buildings}
          value={selectedBuilding}
          onChange={setSelectedBuilding}
          loading={false}
        />
      </Box >

      <RightNavbar />

      {/* Main content area */}
      <Box
        component="main"
        style={{
          marginLeft: 80,
          marginRight: 80,
          marginTop: "calc(var(--mantine-spacing-md) * 2)",
          height: "calc(100vh - var(--mantine-spacing-md) * 4)",
          overflowY: "auto",
          padding: "var(--mantine-spacing-md)",
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider>
          <AppProvider>
            <LayoutContent>{children}</LayoutContent>
          </AppProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

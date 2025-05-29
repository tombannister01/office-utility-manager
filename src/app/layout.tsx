"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Box,
  Loader
} from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../context/AuthContext";
import { UIProvider, useUI } from "../context/UIContext";
import { useBuildings } from "../hooks/useBuildings";
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

const queryClient = new QueryClient();



function LayoutContent({ children }: { children: React.ReactNode }) {
  const { selectedBuilding, setSelectedBuilding } = useUI();
  const { data: buildings = [], isLoading: loadingBuildings } = useBuildings();

  if (loadingBuildings || buildings.length === 0) {
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
          loading={loadingBuildings}
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
        <MantineProvider
          theme={{
            components: {
              Text: {
                defaultProps: {
                  c: "#545F71",
                },
              },
              Title: {
                defaultProps: {
                  c: "#545F71",
                },
              },
            },
            shadows: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "none",
              xl: "none",
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <UIProvider>
                <LayoutContent>{children}</LayoutContent>
              </UIProvider>
            </AuthProvider>
          </QueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

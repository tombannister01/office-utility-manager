"use client";

import { Select } from "@mantine/core";

export interface Building {
  id: string;
  name: string;
}

interface BuildingDropdownProps {
  buildings: Building[];
  value: string | null;
  onChange: (id: string) => void;
  loading: boolean;
}

export function BuildingDropdown({
  buildings,
  value,
  onChange,
  loading,
}: BuildingDropdownProps) {
  return (
    <Select
      data={buildings.map((building) => ({ value: building.id, label: building.name }))}
      placeholder={loading ? "Loading…" : "Select building"}
      value={value}
      onChange={(v) => v && onChange(v)}
      disabled={loading}
      w="200px"
    />
  );
}

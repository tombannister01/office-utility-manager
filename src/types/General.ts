export interface User {
  id: string;
  name: string;
}

export interface Building {
  id: string;
  name: string;
}

export interface UserBuildingsResponse {
  buildings: Building[];
}

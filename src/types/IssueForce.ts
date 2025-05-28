export interface Issue {
  id: string;
  roomId: string;
  roomName: string;
  title: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: string;
}

export interface Room {
  id: string;
  roomName: string;
  capacity: number;
  price: number;
  features: string[];
  isAvailable: boolean;
  imgUrl: string;
}

export interface RoomsResponse {
  rooms: Room[];
}

export interface Meeting {
  id: string;
  roomId: string;
  roomName: string;
  company: string;
  start: string;
  end: string;
}
export interface MeetingsResponse {
  meetings: Meeting[];
}

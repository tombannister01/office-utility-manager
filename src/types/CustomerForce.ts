export interface Viewing {
  id: string;
  unit: string;
  company: string;
  datetime: string;
}

export interface MoveInOut {
  id: string;
  unit: string;
  company: string;
  datetime: string;
}

export interface UpcomingEventsResponse {
  viewings: Viewing[];
  moveInOut: MoveInOut[];
}

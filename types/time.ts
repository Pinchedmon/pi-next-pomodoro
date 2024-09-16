export interface TimeState {
  session: number;
  relax: number;
}

export interface TimeAction {
  type: string;
  session?: number;
  relax?: number;
}

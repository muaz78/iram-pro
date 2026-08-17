export type PageStage = 1 | 2 | 3 | 4 | 5;

export interface MemoryNote {
  id: string;
  title: string;
  date?: string;
  note: string;
  tag: string;
  image?: string;
}

export interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
}

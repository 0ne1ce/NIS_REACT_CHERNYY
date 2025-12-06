export type PetType = 'cat' | 'dog' | 'rabbit' | 'hamster' | 'parrot';
export type PetMood = 'happy' | 'neutral' | 'sad' | 'hungry' | 'sleepy';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  age: number;
  energy: number;
  happiness: number;
  hunger: number;
  level: number;
  image: string;
  mood: PetMood;
}

export type PetActionType = 'FEED' | 'PLAY' | 'SLEEP' | 'PET' | 'ENERGY_TICK' | 'RESET' | 'LEVEL_UP';

export interface PetAction {
  type: PetActionType;
  payload?: Partial<Pet>;
}

export interface PetState {
  energy: number;
  happiness: number;
  hunger: number;
  level: number;
  mood: PetMood;
  isPlaying: boolean;
  isSleeping: boolean;
}

export interface EventLogEntry {
  id: string;
  timestamp: Date;
  petId: string;
  petName: string;
  action: string;
  message: string;
}

export interface FilterState {
  type: PetType | 'all';
  searchQuery: string;
  sortBy: 'name' | 'age' | 'energy';
}

export interface EventContextType {
  events: EventLogEntry[];
  addEvent: (petId: string, petName: string, action: string, message: string) => void;
  clearEvents: () => void;
}


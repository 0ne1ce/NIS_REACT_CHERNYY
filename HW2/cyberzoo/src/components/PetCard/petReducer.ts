import type { PetState, PetAction, PetMood } from '../../types';

function calculateMood(state: PetState): PetMood {
  const { energy, happiness, hunger } = state;
  
  if (energy === 0) return 'sad';
  if (hunger >= 70) return 'hungry';
  if (energy <= 20) return 'sleepy';
  if (happiness <= 30) return 'sad';
  if (happiness >= 70 && energy >= 50) return 'happy';
  return 'neutral';
}

export const createInitialState = (
  energy: number,
  happiness: number,
  hunger: number,
  level: number,
  mood: PetMood
): PetState => ({
  energy,
  happiness,
  hunger,
  level,
  mood,
  isPlaying: false,
  isSleeping: false,
});


export function petReducer(state: PetState, action: PetAction): PetState {
  let newState: PetState;

  switch (action.type) {
    case 'FEED':
      newState = {
        ...state,
        hunger: Math.max(0, state.hunger - 25),
        energy: Math.min(100, state.energy + 5),
        happiness: Math.min(100, state.happiness + 10),
      };
      break;

    case 'PLAY':
      if (state.energy < 10) {
        return state;
      }
      newState = {
        ...state,
        isPlaying: true,
        energy: Math.max(0, state.energy - 15),
        happiness: Math.min(100, state.happiness + 20),
        hunger: Math.min(100, state.hunger + 10),
      };
      break;

    case 'SLEEP':
      newState = {
        ...state,
        isSleeping: true,
        energy: Math.min(100, state.energy + 30),
        hunger: Math.min(100, state.hunger + 5),
      };
      break;

    case 'PET':
      newState = {
        ...state,
        happiness: Math.min(100, state.happiness + 15),
      };
      break;

    case 'LEVEL_UP':
      if (state.energy < 50 || state.happiness < 50) {
        return state;
      }
      newState = {
        ...state,
        level: state.level + 1,
        energy: Math.max(0, state.energy - 20),
        happiness: Math.min(100, state.happiness + 10),
      };
      break;

    case 'ENERGY_TICK':
      newState = {
        ...state,
        energy: Math.max(0, state.energy - 2),
        hunger: Math.min(100, state.hunger + 1),
        happiness: Math.max(0, state.happiness - 1),
        isPlaying: false,
        isSleeping: false,
      };
      break;

    case 'RESET':
      if (action.payload) {
        newState = {
          energy: action.payload.energy ?? 100,
          happiness: action.payload.happiness ?? 100,
          hunger: action.payload.hunger ?? 0,
          level: action.payload.level ?? 1,
          mood: action.payload.mood ?? 'happy',
          isPlaying: false,
          isSleeping: false,
        };
      } else {
        newState = createInitialState(100, 100, 0, 1, 'happy');
      }
      break;

    default:
      return state;
  }

  return {
    ...newState,
    mood: calculateMood(newState),
  };
}


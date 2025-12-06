import { useEffect, useRef, useCallback } from 'react';
import type { PetAction } from '../types';

interface UsePetLifecycleOptions {
  intervalMs?: number;
  dispatch: React.Dispatch<PetAction>;
  energy: number;
  onEnergyDepleted?: () => void;
  onLowEnergy?: () => void;
}

interface UsePetLifecycleReturn {
  isExhausted: boolean;
  isTired: boolean;
  resetTimer: () => void;
}

function usePetLifecycle({
  intervalMs = 5000,
  dispatch,
  energy,
  onEnergyDepleted,
  onLowEnergy,
}: UsePetLifecycleOptions): UsePetLifecycleReturn {
  const intervalRef = useRef<number | null>(null);
  const onEnergyDepletedRef = useRef(onEnergyDepleted);
  const onLowEnergyRef = useRef(onLowEnergy);

  useEffect(() => {
    onEnergyDepletedRef.current = onEnergyDepleted;
  }, [onEnergyDepleted]);

  useEffect(() => {
    onLowEnergyRef.current = onLowEnergy;
  }, [onLowEnergy]);

  const isExhausted = energy === 0;
  const isTired = energy <= 20;

  useEffect(() => {
    if (isExhausted && onEnergyDepletedRef.current) {
      onEnergyDepletedRef.current();
    }
  }, [isExhausted]);

  useEffect(() => {
    if (isTired && !isExhausted && onLowEnergyRef.current) {
      onLowEnergyRef.current();
    }
  }, [isTired, isExhausted]);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(() => {
    clearTimer();
    intervalRef.current = window.setInterval(() => {
      dispatch({ type: 'ENERGY_TICK' });
    }, intervalMs);
  }, [clearTimer, dispatch, intervalMs]);

  useEffect(() => {
    if (!isExhausted) {
      resetTimer();
    }

    return clearTimer;
  }, [isExhausted, resetTimer, clearTimer]);

  return {
    isExhausted,
    isTired,
    resetTimer,
  };
}

export default usePetLifecycle;


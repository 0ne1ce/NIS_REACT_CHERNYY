import { useEffect, useRef, useCallback, useState } from 'react';

interface UseEnergyTimerOptions {
  initialEnergy: number;
  decrementAmount: number;
  intervalMs: number;
  onEnergyChange?: (energy: number) => void;
  onEnergyDepleted?: () => void;
}

interface UseEnergyTimerReturn {
  energy: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: (newEnergy?: number) => void;
  boost: (amount: number) => void;
}

function useEnergyTimer({
  initialEnergy,
  decrementAmount = 1,
  intervalMs = 3000,
  onEnergyChange,
  onEnergyDepleted,
}: UseEnergyTimerOptions): UseEnergyTimerReturn {
  const [energy, setEnergy] = useState<number>(initialEnergy);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const intervalRef = useRef<number | null>(null);
  const onEnergyChangeRef = useRef(onEnergyChange);
  const onEnergyDepletedRef = useRef(onEnergyDepleted);

  useEffect(() => {
    onEnergyChangeRef.current = onEnergyChange;
  }, [onEnergyChange]);

  useEffect(() => {
    onEnergyDepletedRef.current = onEnergyDepleted;
  }, [onEnergyDepleted]);

  const decrementEnergy = useCallback(() => {
    setEnergy((prevEnergy) => {
      const newEnergy = Math.max(0, prevEnergy - decrementAmount);
      
      if (onEnergyChangeRef.current) {
        onEnergyChangeRef.current(newEnergy);
      }
      
      if (newEnergy === 0 && onEnergyDepletedRef.current) {
        onEnergyDepletedRef.current();
      }
      
      return newEnergy;
    });
  }, [decrementAmount]);

  const start = useCallback(() => {
    if (intervalRef.current !== null) return;
    
    setIsRunning(true);
    intervalRef.current = window.setInterval(decrementEnergy, intervalMs);
  }, [decrementEnergy, intervalMs]);

  const stop = useCallback(() => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const reset = useCallback((newEnergy?: number) => {
    setEnergy(newEnergy ?? initialEnergy);
  }, [initialEnergy]);

  const boost = useCallback((amount: number) => {
    setEnergy((prevEnergy) => {
      const newEnergy = Math.min(100, prevEnergy + amount);
      
      if (onEnergyChangeRef.current) {
        onEnergyChangeRef.current(newEnergy);
      }
      
      return newEnergy;
    });
  }, []);

  useEffect(() => {
    if (isRunning) {
      start();
    }
    
    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, start]);

  useEffect(() => {
    setEnergy(initialEnergy);
  }, [initialEnergy]);

  return {
    energy,
    isRunning,
    start,
    stop,
    reset,
    boost,
  };
}

export default useEnergyTimer;


import { useContext, useCallback } from 'react';
import { EventContext } from '../context/EventContext';
import type { EventLogEntry } from '../types';

interface UseEventLogReturn {
  events: EventLogEntry[];
  addEvent: (petId: string, petName: string, action: string, message: string) => void;
  clearEvents: () => void;
  getEventsByPet: (petId: string) => EventLogEntry[];
  getRecentEvents: (count: number) => EventLogEntry[];
}

function useEventLog(): UseEventLogReturn {
  const context = useContext(EventContext);
  
  if (!context) {
    throw new Error('useEventLog must be used within EventProvider');
  }

  const { events, addEvent, clearEvents } = context;

  const getEventsByPet = useCallback(
    (petId: string): EventLogEntry[] => {
      return events.filter((event) => event.petId === petId);
    },
    [events]
  );


  const getRecentEvents = useCallback(
    (count: number): EventLogEntry[] => {
      return events.slice(0, count);
    },
    [events]
  );

  return {
    events,
    addEvent,
    clearEvents,
    getEventsByPet,
    getRecentEvents,
  };
}

export default useEventLog;


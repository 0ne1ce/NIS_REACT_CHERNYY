import { createContext, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { EventContextType, EventLogEntry } from '../types';
import useLocalStorage from '../hooks/useLocalStorage';

export const EventContext = createContext<EventContextType | undefined>(undefined);

interface EventProviderProps {
    children: ReactNode;
}

interface SerializedEventLogEntry {
    id: string;
    timestamp: string;
    petId: string;
    petName: string;
    action: string;
    message: string;
}

export const EventProvider = ({ children }: EventProviderProps) => {
    const [storedEvents, setStoredEvents] = useLocalStorage<SerializedEventLogEntry[]>(
        'cyberzoo-events',
        []
    );

    const events: EventLogEntry[] = useMemo(() => {
        return storedEvents.map((event) => ({
            ...event,
            timestamp: new Date(event.timestamp),
        }));
    }, [storedEvents]);

    const addEvent = useCallback(
        (petId: string, petName: string, action: string, message: string) => {
            const newEvent: SerializedEventLogEntry = {
                id: crypto.randomUUID(),
                timestamp: new Date().toISOString(),
                petId,
                petName,
                action,
                message,
            };
            setStoredEvents((prevEvents) => [newEvent, ...prevEvents].slice(0, 50));
        },
        [setStoredEvents]
    );

    const clearEvents = useCallback(() => {
        setStoredEvents([]);
    }, [setStoredEvents]);

    return (
        <EventContext.Provider value={{ events, addEvent, clearEvents }}>
            {children}
        </EventContext.Provider>
    );
};
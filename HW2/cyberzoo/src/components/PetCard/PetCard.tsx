import React, { useReducer, useEffect, useRef, useCallback, memo } from 'react';
import type { Pet, PetState } from '../../types';
import { useEventLog, usePetLifecycle } from '../../hooks';
import { petReducer, createInitialState } from './petReducer';
import {
  ActionButton,
  ActionButtonsContainer,
  ExhaustedOverlay,
  ExhaustedText,
  ExhaustedIcon,
  LevelBadge,
} from '../PetActions';
import styles from './PetCard.module.scss';

interface PetCardProps {
  pet: Pet;
}

const petTypeLabels: Record<Pet['type'], string> = {
  cat: 'Кот',
  dog: 'Собака',
  rabbit: 'Кролик',
  hamster: 'Хомяк',
  parrot: 'Попугай',
};

const moodLabels: Record<Pet['mood'], string> = {
  happy: 'Счастлив',
  neutral: 'Спокоен',
  sad: 'Грустит',
  hungry: 'Голоден',
  sleepy: 'Сонный',
};

const STORAGE_KEY = 'cyberzoo-pet-states';

const loadPetState = (petId: string, defaultState: PetState): PetState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const allStates: Record<string, PetState> = JSON.parse(stored);
      if (allStates[petId]) {
        return allStates[petId];
      }
    }
  } catch (error) {
    console.warn('Ошибка загрузки состояния питомца:', error);
  }
  return defaultState;
};

const savePetState = (petId: string, state: PetState): void => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allStates: Record<string, PetState> = stored ? JSON.parse(stored) : {};
    allStates[petId] = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allStates));
  } catch (error) {
    console.warn('Ошибка сохранения состояния питомца:', error);
  }
};

const PetCard: React.FC<PetCardProps> = memo(({ pet }) => {
  const [state, dispatch] = useReducer(
    petReducer,
    createInitialState(pet.energy, pet.happiness, pet.hunger, pet.level, pet.mood),
    (initialState) => loadPetState(pet.id, initialState)
  );

  const { addEvent } = useEventLog();

  const { isExhausted, isTired } = usePetLifecycle({
    dispatch,
    energy: state.energy,
    intervalMs: 5000,
    onEnergyDepleted: useCallback(() => {
      addEvent(pet.id, pet.name, 'EXHAUSTED', `${pet.name} полностью истощён! Срочно нужен отдых.`);
    }, [pet.id, pet.name, addEvent]),
    onLowEnergy: useCallback(() => {
      addEvent(pet.id, pet.name, 'LOW_ENERGY', `${pet.name} устал. Энергия на исходе.`);
    }, [pet.id, pet.name, addEvent]),
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const actionTimeoutRef = useRef<number | null>(null);

  const triggerActionAnimation = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.6)';
      
      if (actionTimeoutRef.current) {
        window.clearTimeout(actionTimeoutRef.current);
      }
      
      actionTimeoutRef.current = window.setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.boxShadow = '';
        }
      }, 300);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (actionTimeoutRef.current) {
        window.clearTimeout(actionTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    savePetState(pet.id, state);
  }, [pet.id, state]);

  const handleFeed = useCallback(() => {
    dispatch({ type: 'FEED' });
    addEvent(pet.id, pet.name, 'FEED', `${pet.name} покормлен! Голод уменьшился.`);
    triggerActionAnimation();
  }, [pet.id, pet.name, addEvent, triggerActionAnimation]);

  const handlePlay = useCallback(() => {
    if (state.energy < 10) {
      addEvent(pet.id, pet.name, 'PLAY', `${pet.name} слишком устал для игры!`);
      return;
    }
    dispatch({ type: 'PLAY' });
    addEvent(pet.id, pet.name, 'PLAY', `${pet.name} играет! Счастье увеличилось.`);
    triggerActionAnimation();
  }, [pet.id, pet.name, state.energy, addEvent, triggerActionAnimation]);

  const handleSleep = useCallback(() => {
    dispatch({ type: 'SLEEP' });
    addEvent(pet.id, pet.name, 'SLEEP', `${pet.name} отдыхает. Энергия восстанавливается.`);
    triggerActionAnimation();
  }, [pet.id, pet.name, addEvent, triggerActionAnimation]);

  const handlePet = useCallback(() => {
    dispatch({ type: 'PET' });
    addEvent(pet.id, pet.name, 'PET', `${pet.name} погладили! Настроение улучшилось.`);
    triggerActionAnimation();
  }, [pet.id, pet.name, addEvent, triggerActionAnimation]);

  const handleLevelUp = useCallback(() => {
    if (state.energy < 50 || state.happiness < 50) {
      addEvent(pet.id, pet.name, 'LEVEL_UP', `${pet.name} не готов к повышению уровня. Нужно больше энергии и счастья!`);
      return;
    }
    dispatch({ type: 'LEVEL_UP' });
    addEvent(pet.id, pet.name, 'LEVEL_UP', `${pet.name} повысил уровень до ${state.level + 1}! 🎉`);
    triggerActionAnimation();
  }, [pet.id, pet.name, state.energy, state.happiness, state.level, addEvent, triggerActionAnimation]);

  const handleReset = useCallback(() => {
    dispatch({ 
      type: 'RESET', 
      payload: { 
        energy: pet.energy, 
        happiness: pet.happiness, 
        hunger: pet.hunger,
        level: pet.level,
        mood: pet.mood 
      } 
    });
    addEvent(pet.id, pet.name, 'RESET', `${pet.name} сброшен до исходного состояния.`);
    triggerActionAnimation();
  }, [pet.id, pet.name, pet.energy, pet.happiness, pet.hunger, pet.level, pet.mood, addEvent, triggerActionAnimation]);

  const energyBarStyle: React.CSSProperties = {
    width: `${state.energy}%`,
    background: state.energy < 20 
      ? 'linear-gradient(90deg, #ff7675 0%, #d63031 100%)' 
      : undefined,
  };

  const happinessBarStyle: React.CSSProperties = {
    width: `${state.happiness}%`,
  };

  const hungerBarStyle: React.CSSProperties = {
    width: `${state.hunger}%`,
  };

  const cardDynamicStyle: React.CSSProperties = {
    boxShadow: isExhausted 
      ? '0 0 30px rgba(255, 118, 117, 0.5)' 
      : isTired 
        ? '0 0 20px rgba(162, 155, 254, 0.4)' 
        : undefined,
  };

  return (
    <div 
      ref={cardRef}
      className={styles.card}
      style={cardDynamicStyle}
      role="article"
      aria-label={`Карточка питомца ${pet.name}`}
    >
      {/* Overlay при истощении (energy = 0) */}
      {isExhausted && (
        <ExhaustedOverlay>
          <ExhaustedIcon>😵</ExhaustedIcon>
          <ExhaustedText>Истощён!</ExhaustedText>
          <ActionButton $variant="sleep" onClick={handleSleep}>
            😴 Срочно спать!
          </ActionButton>
        </ExhaustedOverlay>
      )}

      <span className={styles.age}>{pet.age} лет</span>
      
      {/* Бейдж уровня */}
      <LevelBadge>
        ⭐ Уровень {state.level}
      </LevelBadge>
      
      <div 
        className={`${styles.avatar} ${state.isPlaying ? styles.playing : ''} ${state.isSleeping ? styles.sleeping : ''}`}
        aria-hidden="true"
      >
        {pet.image}
      </div>
      
      <h3 className={styles.name}>{pet.name}</h3>
      <p className={styles.type}>{petTypeLabels[pet.type]}</p>
      
      <div style={{ textAlign: 'center' }}>
        <span className={`${styles.moodBadge} ${styles[state.mood]}`}>
          {moodLabels[state.mood]}
        </span>
      </div>
      
      <div className={styles.stats}>
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Энергия</span>
          <div className={styles.statBar}>
            <div 
              className={`${styles.statFill} ${styles.energy}`}
              style={energyBarStyle}
            />
          </div>
          <span className={styles.statValue}>{state.energy}%</span>
        </div>
        
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Счастье</span>
          <div className={styles.statBar}>
            <div 
              className={`${styles.statFill} ${styles.happiness}`}
              style={happinessBarStyle}
            />
          </div>
          <span className={styles.statValue}>{state.happiness}%</span>
        </div>
        
        <div className={styles.statRow}>
          <span className={styles.statLabel}>Голод</span>
          <div className={styles.statBar}>
            <div 
              className={`${styles.statFill} ${styles.hunger}`}
              style={hungerBarStyle}
            />
          </div>
          <span className={styles.statValue}>{state.hunger}%</span>
        </div>
      </div>
      
      {/* Кнопки действий с использованием styled-components */}
      <ActionButtonsContainer>
        <ActionButton 
          $variant="feed"
          onClick={handleFeed}
          disabled={isExhausted}
          aria-label={`Покормить ${pet.name}`}
        >
          🍖 Кормить
        </ActionButton>
        <ActionButton 
          $variant="play"
          onClick={handlePlay}
          disabled={state.energy < 10 || isExhausted}
          aria-label={`Играть с ${pet.name}`}
        >
          🎾 Играть
        </ActionButton>
        <ActionButton 
          $variant="sleep"
          onClick={handleSleep}
          disabled={isExhausted}
          aria-label={`Уложить спать ${pet.name}`}
        >
          😴 Спать
        </ActionButton>
        <ActionButton 
          $variant="pet"
          onClick={handlePet}
          disabled={isExhausted}
          aria-label={`Погладить ${pet.name}`}
        >
          🤚 Гладить
        </ActionButton>
        <ActionButton 
          $variant="levelUp"
          onClick={handleLevelUp}
          disabled={state.energy < 50 || state.happiness < 50 || isExhausted}
          aria-label={`Повысить уровень ${pet.name}`}
        >
          ⬆️ Level Up
        </ActionButton>
        <ActionButton 
          $variant="reset"
          onClick={handleReset}
          aria-label={`Сбросить ${pet.name}`}
        >
          🔄 Сброс
        </ActionButton>
      </ActionButtonsContainer>
    </div>
  );
});

PetCard.displayName = 'PetCard';

export default PetCard;

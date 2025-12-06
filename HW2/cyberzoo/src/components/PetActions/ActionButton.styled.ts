import styled, { css, keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

interface ActionButtonProps {
  $variant?: 'feed' | 'play' | 'sleep' | 'pet' | 'levelUp' | 'reset';
  $isDisabled?: boolean;
}

const variantStyles = {
  feed: css`
    background: linear-gradient(135deg, #ff7675 0%, #d63031 100%);
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #ff8a89 0%, #e74c3c 100%);
      box-shadow: 0 4px 15px rgba(214, 48, 49, 0.4);
    }
  `,
  play: css`
    background: linear-gradient(135deg, #00b894 0%, #00a885 100%);
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #00d9a7 0%, #00c896 100%);
      box-shadow: 0 4px 15px rgba(0, 184, 148, 0.4);
    }
  `,
  sleep: css`
    background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #b8b3ff 0%, #7d6ff0 100%);
      box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
    }
  `,
  pet: css`
    background: linear-gradient(135deg, #fdcb6e 0%, #f39c12 100%);
    color: #2d3436;
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #ffeaa7 0%, #f1c40f 100%);
      box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
    }
  `,
  levelUp: css`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    background-size: 200% auto;
    animation: ${shimmer} 3s linear infinite;
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #7a8ff0 0%, #8a5eb5 100%);
      box-shadow: 0 4px 15px rgba(118, 75, 162, 0.5);
    }
  `,
  reset: css`
    background: linear-gradient(135deg, #636e72 0%, #2d3436 100%);
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #747d80 0%, #3d4447 100%);
      box-shadow: 0 4px 15px rgba(45, 52, 54, 0.4);
    }
  `,
};

export const ActionButton = styled.button<ActionButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 10px 16px;
  border: none;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  min-width: 100px;

  ${({ $variant = 'feed' }) => variantStyles[$variant]}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(0.5);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }

  &:focus:not(:focus-visible) {
    box-shadow: none;
  }
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 16px;
`;

export const ExhaustedOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: inherit;
  z-index: 10;
  animation: ${pulse} 2s ease-in-out infinite;
`;

export const ExhaustedText = styled.span`
  color: #ff7675;
  font-weight: 700;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const ExhaustedIcon = styled.span`
  font-size: 2.5rem;
`;

export const LevelBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
`;


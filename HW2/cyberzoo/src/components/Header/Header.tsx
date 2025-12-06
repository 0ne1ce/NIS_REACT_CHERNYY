import React, { memo } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 20px rgba(102, 126, 234, 0.5);
  }
  50% {
    text-shadow: 0 0 40px rgba(102, 126, 234, 0.8), 0 0 60px rgba(118, 75, 162, 0.6);
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

const HeaderWrapper = styled.header`
  width: 100%;
  padding: 40px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(ellipse at center, rgba(102, 126, 234, 0.15) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const Logo = styled.span`
  font-size: 48px;
  animation: ${float} 3s ease-in-out infinite;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(
    90deg,
    #667eea 0%,
    #764ba2 25%,
    #f093fb 50%,
    #764ba2 75%,
    #667eea 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 4s linear infinite, ${glow} 2s ease-in-out infinite;
  letter-spacing: 2px;
  
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
  font-weight: 300;
  letter-spacing: 1px;
  
  @media (max-width: 640px) {
    font-size: 0.9rem;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 8px 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-weight: 500;
`;

const DecorativeOrbs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Orb = styled.div<{ $size: number; $top: string; $left: string; $delay: number }>`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  top: ${props => props.$top};
  left: ${props => props.$left};
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${float} ${props => 3 + props.$delay}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

const Header: React.FC = memo(() => {
  return (
    <HeaderWrapper>
      <DecorativeOrbs>
        <Orb $size={100} $top="10%" $left="10%" $delay={0} />
        <Orb $size={60} $top="60%" $left="5%" $delay={1} />
        <Orb $size={80} $top="20%" $left="85%" $delay={0.5} />
        <Orb $size={40} $top="70%" $left="90%" $delay={1.5} />
      </DecorativeOrbs>
      
      <LogoContainer>
        <Logo role="img" aria-label="pets">🐾</Logo>
        <Title>CyberZoo</Title>
        <Logo role="img" aria-label="pets">🐾</Logo>
      </LogoContainer>
      
      <Subtitle>
        Виртуальный зоопарк нового поколения
      </Subtitle>
      
      <Badge>
        Ухаживай за питомцами в реальном времени
      </Badge>
    </HeaderWrapper>
  );
});

Header.displayName = 'Header';

export default Header;


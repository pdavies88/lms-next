'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import ReactConfetti from 'react-confetti';

type ConfettiContextType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const ConfettiContext = createContext<ConfettiContextType | undefined>(
  undefined
);

export const ConfettiProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <ConfettiContext.Provider value={{ isOpen, onOpen, onClose }}>
      {isOpen && (
        <ReactConfetti
          numberOfPieces={500}
          recycle={false}
          onConfettiComplete={onClose}
        />
      )}
      {children}
    </ConfettiContext.Provider>
  );
};

export const useConfetti = (): ConfettiContextType => {
  const context = useContext(ConfettiContext);
  if (!context) {
    throw new Error('useConfetti must be used within a ConfettiProvider');
  }
  return context;
};

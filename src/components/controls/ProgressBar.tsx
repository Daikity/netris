import React, { useRef } from 'react';

interface ProgressBarProps {
  duration: number;
  currentTime: number;
  onSeek: (time: number) => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ duration, currentTime, onSeek }) => {
  const progressBarRef = useRef<HTMLDivElement>(null)

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (progressBarRef.current) {
      const progressBarWidth = progressBarRef.current.offsetWidth;
      const clickPosition = e.nativeEvent.offsetX;
      const clickPercent = clickPosition / progressBarWidth;
      const newTime = duration * clickPercent;
      onSeek(newTime);
    }
  }

  return (
    <div 
      className="progress-container"
      ref={progressBarRef} 
      onClick={handleProgressClick}
    >
      <div className="progress-bar"></div>
      <div 
        className="progress-value"
        style={{ 
          width: `${(currentTime / duration) * 100}%`,
          transition: 'width 0.3s ease-in-out',
        }}
      ></div>
    </div>
  );
};

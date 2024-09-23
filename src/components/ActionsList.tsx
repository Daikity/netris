import React from 'react';
import { VideoAction } from '../types/actions';

interface ActionsListProps {
  actions: VideoAction[];
  onEventClick: (time: number) => void;
}

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const milliseconds = Math.floor((seconds % 1) * 1000);

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = secs.toString().padStart(2, '0');
  const formattedMilliseconds = milliseconds.toString().padStart(3, '0');

  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};

const ActionsList: React.FC<ActionsListProps> = ({ actions, onEventClick }) => {
  return (
    <ul className='action-list'>
      {actions.map((action, i) => (
        <li key={i} onClick={() => onEventClick(action.timestamp)}>
          <p>
            {formatTime(action.timestamp)}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ActionsList;

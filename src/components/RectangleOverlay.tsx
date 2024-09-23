import React from 'react';
import { Zone } from '../types/actions';

interface RectangleOverlayProps {
  positioning: Zone[];
}

const RectangleOverlay: React.FC<RectangleOverlayProps> = ({ positioning }) => {
  return (
    <>
      {positioning.map((zone, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: `${zone.top}px`,
            left: `${zone.left}px`,
            width: `${zone.width}px`,
            height: `${zone.height}px`,
            border: '2px solid green',
            zIndex: 1000,
          }}
        />
      ))}
    </>
  )
}

export default RectangleOverlay;

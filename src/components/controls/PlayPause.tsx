import React from 'react';

import { MdOutlinePlayArrow, MdOutlinePause } from "react-icons/md";

interface PlayPauseControlProps {
  isPlay: boolean;
  onStartStopVideo: () => void;
}

export const PlayPause: React.FC<PlayPauseControlProps> = ({isPlay, onStartStopVideo}) => {

  const playPauseVideo = () => onStartStopVideo()

  if (!isPlay) return <MdOutlinePlayArrow className='control' onClick={playPauseVideo} />;
  else return <MdOutlinePause className='control' onClick={playPauseVideo} />;
};

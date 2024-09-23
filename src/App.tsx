import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActionsList from './components/ActionsList';
import RectangleOverlay from './components/RectangleOverlay';
import { AddTime, PlayPause, ProgressBar } from './components/controls';
import constants from './constants';
import { ActionReducers } from './types/actions';
import { fetchActions } from './store/actionsReducer';

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlay, setIsPlay] = useState<boolean>(false);

  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);
  const actions = useSelector((state: ActionReducers) => state.actionsReducer.actions);

  useEffect(() => {
    dispatch(fetchActions());
  }, [dispatch]);

  const togglePlayPause = () => {
    if (videoRef.current) {
      isPlay ? videoRef.current.pause() : videoRef.current.play();
      setIsPlay(!isPlay);
    }
  };

  const updateTime = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const addTime = (increment: number) => {
    if (videoRef.current) {
      const newTime = Math.min(currentTime + increment, duration);
      handleSeek(newTime);
    }
  };

  const activeActions = actions.filter(
    action => currentTime >= action.timestamp - 0.01 && currentTime <= action.timestamp + action.duration
  );

  return (
    <>
      <div className='video-player'>
        <video
          ref={videoRef}
          src={constants.VIDEO_URL}
          onClick={togglePlayPause}
          onTimeUpdate={updateTime}
          onDurationChange={() => setDuration(videoRef.current?.duration || 0)}
        />
        <div className="controls-container">
          <div className='controls'>
            <PlayPause isPlay={isPlay} onStartStopVideo={togglePlayPause} />
            <AddTime updateTime={() => addTime(30)} />
          </div>
          <div className="controls" style={{ width: '100%', padding: '15px 15px 0 15px' }}>
            <ProgressBar 
              duration={duration} 
              currentTime={currentTime} 
              onSeek={handleSeek} 
            />
          </div>
        </div>
        <RectangleOverlay positioning={activeActions.map(event => event.zone)} />
      </div>
      <div>
        <ActionsList actions={actions} onEventClick={handleSeek} />
      </div>
    </>
  );
};

export default App;

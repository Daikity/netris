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

  const actions = useSelector((state: ActionReducers) => state.actionsReducer.actions)
  
  const handleEventClick = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }

  const activeActions = actions.filter(
    action => currentTime >= action.timestamp - 0.01 && currentTime <= action.timestamp + action.duration
  )

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlay(true);
      } else {
        videoRef.current.pause();
        setIsPlay(false);
      }
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const addTime = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime + 30;
      setCurrentTime(currentTime + 30);
    }
  }

  const handleDurationUpdate = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }

  useEffect(() => {
    dispatch(fetchActions())
  }, [dispatch])

  return (
    <>
      <div className='video-player'>
        <video
          ref={videoRef}
          src={constants.VIDEO_URL}
          onClick={handleVideoClick}
          onTimeUpdate={handleTimeUpdate}
          onDurationChange={handleDurationUpdate}
        />
        <div className="controls-container">
          <div className='controls'>
            <PlayPause isPlay={isPlay} onStartStopVideo={handleVideoClick} />
            <AddTime updateTime={addTime} />
          </div>
          <div className="controls" style={{width: '100%', padding: '15px 15px 0 15px'}}>
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
        <ActionsList actions={actions} onEventClick={handleEventClick} />
      </div>
    </>
  );
};

export default App;

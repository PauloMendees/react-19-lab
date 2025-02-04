import { useEffect, useRef, useState } from 'react';

const useStopWatch = () => {
  const [previousDuration, setPreviousDuration] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [lastTime, setLastTime] = useState(0);

  const requestIdRef = useRef(0);

  const updateTime = (time: number) => {
    setLastTime(time);
    requestIdRef.current = requestAnimationFrame(updateTime);
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestIdRef.current);
    };
  }, []);

  const start = () => {
    const now = performance.now();
    setStartTime(now);
    setLastTime(now);
    requestIdRef.current = requestAnimationFrame(updateTime);
  };

  const stop = () => {
    cancelAnimationFrame(requestIdRef.current);
    setPreviousDuration(previousDuration + performance.now() - startTime);
    setStartTime(0);
    setLastTime(0);
  };
  return {
    elapsed: previousDuration + lastTime - startTime,
    start,
    stop,
  };
};

export default useStopWatch;

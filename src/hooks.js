import {useEffect, useRef} from 'react';

export const usePrevious = (value) => {
  const r = useRef();

  useEffect(() => {
    r.current = value;
  })

  return r.current;
}
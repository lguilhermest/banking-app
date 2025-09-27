import { useReducer, useRef } from 'react';
import { Action, Dispatch } from '@types';

export function useCreateReducer<T extends Record<string, any>>(
  initialState?: Partial<T>,
): [T, Dispatch<T>] {
  const initRef = useRef(initialState ?? ({} as T));

  function reducer(state: T, action: Action<T>): T {
    switch (action.type) {
      case 'reset':
        return initRef.current as T;

      case 'update':
        return { ...state, ...action.payload };

      default:
        return { ...state, [action.type]: action.payload };
    }
  }

  const [state, dispatch] = useReducer(reducer, initRef.current as T);

  const actionDispatch = (<K extends keyof T>(type: K, payload?: T[K]) => {
    dispatch({ type, payload });
  }) as Dispatch<T>;

  actionDispatch.update = (payload: Partial<T>) => {
    dispatch({ type: 'update', payload });
  };

  actionDispatch.reset = () => {
    dispatch({ type: 'reset' });
  };

  return [state, actionDispatch];
}

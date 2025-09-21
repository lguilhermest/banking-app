import { Action, Dispatch } from '@types';
import { useReducer } from 'react';

export function useCreateReducer<T extends Record<string, any>>(
  initialState?: Partial<T>,
): [T, Dispatch<T>] {
  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state: any, action: Action<T>) {
    if (action.type === 'reset') {
      return initialState;
    }

    if (action.type === 'update') {
      return {
        ...state,
        ...action.payload,
      };
    }

    return {
      ...state,
      [action.type]: action.payload,
    };
  }

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

export interface Action<T> {
  type: 'reset' | 'update' | keyof T;
  payload?: T[keyof T] | Partial<T>;
}

export type Dispatch<T> = {
  <K extends keyof T>(type: K, payload?: T[K]): void;
  update: (payload: Partial<T>) => void;
  reset: () => void;
};
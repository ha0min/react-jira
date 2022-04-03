import { useCallback, useState } from "react";
import { stat } from "fs";

export const UseUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    present: T;
    past: T[];
    future: T[];
  }>({
    present: initialPresent,
    past: [],
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const set = useCallback((newState: T) => {
    setState((currentState) => {
      const { past, present } = currentState;
      if (newState === present) return currentState;
      return {
        present: newState,
        past: [...past, present],
        future: [],
      };
    });
  }, []);

  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, future } = currentState;

      if (!canUndo) {
        return currentState;
      }
      const prev = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        present: prev,
        past: newPast,
        future: [...future, prev],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, future } = currentState;
      if (future.length === 0) {
        return currentState;
      }

      const next = future[future.length - 1];
      const newFuture = future.slice(0, future.length - 1);

      return {
        present: next,
        future: newFuture,
        past: [...past, next],
      };
    });
  }, []);

  const reset = useCallback((resetState) => {
    setState(() => {
      return {
        past: [],
        future: [],
        present: resetState,
      };
    });
  }, []);

  return {
    state,
    set,
    canRedo,
    canUndo,
    redo,
    undo,
  };
};

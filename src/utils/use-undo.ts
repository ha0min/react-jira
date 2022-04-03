import { useCallback, useReducer, useState } from "react";
import { stat } from "fs";

const REDO = "REDO";
const UNDO = "UNDO";
const SET = "SET";
const RESET = "RESET";

type StateType<T> = {
  present: T;
  past: T[];
  future: T[];
};

type ActionType<T> = {
  presentState?: T;
  type: typeof REDO | typeof UNDO | typeof SET | typeof RESET;
};

/**
 * Undo的Reducer，接受action type为redo, undo, set, reset
 * @param state
 * @param action
 */
const undoReducer = <T>(state: StateType<T>, action: ActionType<T>) => {
  const { past, future, present } = state;

  switch (action.type) {
    case UNDO: {
      if (past.length === 0) {
        return state;
      }
      const prev = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        present: prev,
        past: newPast,
        future: [...future, prev],
      };
    }

    case REDO: {
      if (future.length === 0) {
        return state;
      }

      const next = future[future.length - 1];
      const newFuture = future.slice(0, future.length - 1);

      return {
        present: next,
        future: newFuture,
        past: [...past, next],
      };
    }

    case SET: {
      if (present === action.presentState) {
        return state;
      }
      return {
        present: action.presentState,
        past: [...past, present],
        future: [],
      };
    }

    case RESET: {
      return {
        past: [],
        future: [],
        present: action.presentState,
      };
    }

    default:
      return state;
  }
};

/**
 * 自定义hook useUndo
 * @param initialPresent 初始参数
 * @constructor
 */
export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    present: initialPresent,
    past: [],
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const set = useCallback((newState: T) => {
    dispatch({ presentState: newState, type: SET });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  const reset = useCallback((resetState) => {
    dispatch({ presentState: resetState, type: RESET });
  }, []);

  return [
    state,
    {
      set,
      canRedo,
      canUndo,
      redo,
      undo,
    },
  ] as const;
};

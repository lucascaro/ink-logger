import { SpinnerName as _SpinnerName } from "cli-spinners";

export type SpinnerName = _SpinnerName;

export interface ConsoleManagerState {
  log: React.ReactElement[];
  tasks?: TaskDefinition[];
}

export enum ConsoleActionType {
  LOG,
  SET_TASKS,
}

export type ConsoleAction = ConsoleLogAction | ConsoleSetTasksAction;

export interface ConsoleLogAction {
  type: ConsoleActionType.LOG;
  message: React.ReactElement;
}

export interface TaskDefinition {
  message: React.ReactElement;
  withSpinner?: boolean;
  spinnerName?: SpinnerName;
}
export interface ConsoleSetTasksAction {
  type: ConsoleActionType.SET_TASKS;
  tasks: TaskDefinition[];
}

export type ConsoleReducer = (state: ConsoleManagerState, action: ConsoleAction) => ConsoleManagerState;

export const reducer: ConsoleReducer = (state, action) => {
  const log = [];
  switch (action.type) {
    case ConsoleActionType.LOG:
      // Use sparse arrays for the log, anticipating large numbers of logs.
      log[state.log.length] = action.message;
      return { ...state, log };
    case ConsoleActionType.SET_TASKS:
      return {
        ...state,
        tasks: action.tasks,
      };
    default:
      // Exhaustive check.
      const _: never = action;
      throw new Error(`Unknown action type: ${action}`);
  }
};

export const logAction = (message: React.ReactElement): ConsoleLogAction => ({
  type: ConsoleActionType.LOG,
  message,
});

export const setTasksAction = (tasks: TaskDefinition[]): ConsoleSetTasksAction => ({
  type: ConsoleActionType.SET_TASKS,
  tasks,
});

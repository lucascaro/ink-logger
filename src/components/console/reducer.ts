import { SpinnerName as _SpinnerName } from "cli-spinners";

export type SpinnerName = _SpinnerName;

export interface ConsoleManagerState {
  log: React.ReactElement[];
  tasks?: TaskDefinition[];
  input?: TextInputDefinition;
}

export enum ConsoleActionType {
  LOG,
  SET_TASKS,
  TEXT_INPUT,
}

export type ConsoleAction = ConsoleLogAction | ConsoleSetTasksAction | ConsoleTextInputAction;

export interface ConsoleLogAction {
  type: ConsoleActionType.LOG;
  message: React.ReactElement;
}

export interface TaskDefinition {
  message: React.ReactElement;
  withSpinner?: boolean;
  spinnerName?: SpinnerName;
}
export interface TextInputDefinition {
  prompt: string;
  defVal: string;
  placeholder: string;
  callback: (err: null | Error, result: string) => void;
}
export interface ConsoleSetTasksAction {
  type: ConsoleActionType.SET_TASKS;
  tasks: TaskDefinition[];
}
export interface ConsoleTextInputAction extends TextInputDefinition {
  type: ConsoleActionType.TEXT_INPUT;
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
    case ConsoleActionType.TEXT_INPUT:
      return {
        ...state,
        input: action,
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

export const textInputAction = (
  prompt: string,
  defVal: string,
  placeholder: string,
  callback: (err: null | Error, result: string) => void,
): ConsoleTextInputAction => ({
  type: ConsoleActionType.TEXT_INPUT,
  prompt,
  defVal,
  placeholder,
  callback,
});

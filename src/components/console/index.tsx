import { Box, Static, Text } from "ink";
import React, { Dispatch, useReducer } from "react";
import Spinner from "ink-spinner";
import { ConsoleAction, ConsoleManagerState, reducer } from "./reducer";
import { Input } from "../input";

export { ConsoleAction, logAction, setTasksAction, textInputAction } from "./reducer";

const initialState: ConsoleManagerState = {
  log: [],
};

export interface ConsoleProps {
  onDispatch: (reducer: Dispatch<ConsoleAction>) => void;
}

export const ConsoleComponent: React.FC<ConsoleProps> = ({ onDispatch }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  onDispatch(dispatch);
  return (
    <>
      <Static items={state.log}>{(line, i) => <Text key={i}>{line}</Text>}</Static>
      {state.tasks && (
        <Box flexDirection="column">
          {Array.from(state.tasks.values()).map((task, i) => (
            <Box key={i}>
              {task.withSpinner && (
                <Box marginRight={1}>
                  <Spinner type={task.spinnerName} />
                </Box>
              )}
              <Box justifyContent="space-between">{task.message}</Box>
            </Box>
          ))}
        </Box>
      )}
      {state.input && (
        <Input
          prompt={state.input.prompt}
          defaultValue={state.input.defVal}
          placeholder={state.input.placeholder}
          onSubmit={(val) => {
            if (state.input) {
              const { callback } = state.input;
              state.input = undefined;
              callback(null, val);
            }
          }}
        />
      )}
    </>
  );
};
``;

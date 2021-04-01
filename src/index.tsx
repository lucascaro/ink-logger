import { Box, Instance, Newline, render, Text } from "ink";
import { Dispatch } from "react";
import { ConsoleComponent, logAction, setTaskAction } from "./components/console";
import { ConsoleAction } from "./components/console/reducer";
import { LogLine } from "./components/console/log-line";
import { Color } from "chalk";

export interface Task {
  name: string;
  done: boolean;
}

enum LogLevel {
  log = "log",
  info = "info",
  success = "success",
  warn = "warn",
  error = "error",
}

type PerLogLevelConfig = { [k in LogLevel]: string };
export interface ConsoleManagerOptions<T = PerLogLevelConfig> {
  bullets: T;
  bulletColors: T;
  textColors: T;
}

export interface ConsoleManager {
  log: (message: string) => void;
  info: (message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
  setTask: (messages?: string | string[], withSpinner?: boolean) => void;
  clearTask: () => void;
}

const defaultOptions: ConsoleManagerOptions = {
  bullets: {
    [LogLevel.log]: "",
    [LogLevel.info]: "❖",
    [LogLevel.success]: "✔",
    [LogLevel.warn]: "▴",
    [LogLevel.error]: "✗",
  },
  bulletColors: {
    [LogLevel.log]: "",
    [LogLevel.info]: "blue",
    [LogLevel.success]: "green",
    [LogLevel.warn]: "yellow",
    [LogLevel.error]: "red",
  },
  textColors: {
    [LogLevel.log]: "",
    [LogLevel.info]: "blue",
    [LogLevel.success]: "green",
    [LogLevel.warn]: "yellow",
    [LogLevel.error]: "red",
  },
} as const;

type ConsoleManagerPartialOptions = Partial<ConsoleManagerOptions<Partial<PerLogLevelConfig>>>;
export function consoleManager(options?: ConsoleManagerPartialOptions): Promise<Readonly<ConsoleManager>> {
  const cmOptions: ConsoleManagerOptions = mergeOptions(defaultOptions, options);

  return new Promise((resolve) => {
    let dispatch: Dispatch<ConsoleAction>;

    render(
      <ConsoleComponent
        onDispatch={(r) => {
          if (r && !dispatch) {
            dispatch = r;
            resolve(newConsoleManager(dispatch, cmOptions));
          }
        }}
      />,
    );
  });
}

function newConsoleManager(dispatch: Dispatch<ConsoleAction>, options: ConsoleManagerOptions): ConsoleManager {
  const logDisplatcher = (prefix?: string, bulletColor?: string, textColor?: string) => (message: string): void =>
    dispatch(logAction(<LogLine prefixColor={bulletColor} prefix={prefix} color={textColor} message={message} />));

  const formats = Object.values(LogLevel).reduce((p, level) => {
    p[level] = [options.bullets[level], options.bulletColors[level], options.textColors[level]];
    return p;
  }, {} as { [k in LogLevel]: string[] });

  const self: ConsoleManager = {
    clearTask() {
      self.setTask();
    },
    setTask(messages = [], withSpinner = false) {
      if (typeof messages === "string") {
        messages = [messages];
      }
      dispatch(
        setTaskAction(
          <Box justifyContent="space-between" width="100%">
            {messages.map((message, i) => (
              <Text key={i}>{message}</Text>
            ))}
          </Box>,
          withSpinner,
        ),
      );
    },
    log: logDisplatcher(...formats[LogLevel.log]),
    info: logDisplatcher(...formats[LogLevel.info]),
    success: logDisplatcher(...formats[LogLevel.success]),
    error: logDisplatcher(...formats[LogLevel.error]),
    warn: logDisplatcher(...formats[LogLevel.warn]),
  } as const;
  return Object.freeze(self);
}

function mergeOptions(a: ConsoleManagerOptions, b: ConsoleManagerPartialOptions = {}): ConsoleManagerOptions {
  const merged: ConsoleManagerOptions = { ...a } as const;
  let key: keyof ConsoleManagerOptions;
  for (key in b) {
    merged[key] = { ...a[key], ...b[key] };
  }
  return merged;
}

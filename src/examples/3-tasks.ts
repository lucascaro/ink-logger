import { consoleManager } from "..";
import { promisify } from "util";

const waitms = promisify((ms: number, cb: Function) => setTimeout(() => cb(null), ms));

/**
 * Simples use of this library.
 *
 * use ConsoleManager.log as a replacement of console.log.
 */
(async () => {
  const cm = await consoleManager();

  // An initial first log.
  cm.log(`This is a log message`);

  // Set the current task, with a spinner.
  const firstTask = cm.startTask(`Working`, true);

  // Do some logging
  await waitms(300);
  cm.success(`some sub-task's output`);
  await waitms(300);
  cm.warn(`some warning`);
  await waitms(300);
  cm.success(`some sub-task's output`);
  await waitms(300);
  cm.error(`something failed`);
  await waitms(300);
  cm.success(`some sub-task's output`);
  await waitms(300);
  cm.success(`some sub-task's output`);
  await waitms(300);
  cm.success(`some sub-task's output`);
  await waitms(300);
  cm.success(`some sub-task's output`);
  await waitms(300);
  // You can also set a different spinner
  const secondTask = cm.startTask(`Finishing`, "pong");
  await waitms(1000);
  firstTask.end();
  await waitms(2000);

  cm.log("All tasks done");
  // After all tasks are done, the program exits.
  secondTask.end();
  // or clear all remaining tasks by running:
  cm.clearTasks();
})();

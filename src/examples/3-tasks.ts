import { consoleManager } from "..";

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
  cm.setTask(`Working`, true);

  let nlogs = 0;
  const interval = setInterval(() => {
    nlogs++;
    // Log something every 100ms
    if (nlogs % 3 === 0) {
      cm.warn(`${nlogs} some warning`);
    } else if (nlogs % 5 === 0) {
      cm.error(`${nlogs} something failed`);
    } else {
      cm.success(`${nlogs} some sub-task's output`);
    }
    if (nlogs === 10) {
      clearInterval(interval);
      // After all tasks are done, set a final task with no spinner to end.
      cm.setTask("All tasks done", false);

      // Or use clearTask()
      cm.log("All tasks done");
      cm.clearTask();
    }
  }, 100);
})();

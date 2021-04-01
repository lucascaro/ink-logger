import { consoleManager } from "..";
/**
 * Simplest use of this library.
 *
 * use ConsoleManager.log as a replacement of console.log.
 */
(async () => {
  const cm = await consoleManager();
  cm.log(`This is a log message`);
  cm.info(`This is a info message`);
  cm.success(`This is a success message`);
  cm.warn(`This is a warn message`);
  cm.error(`This is a error message`);
})();

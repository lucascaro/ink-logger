import { consoleManager } from "..";

/**
 * Simples use of this library.
 *
 * use ConsoleManager.log as a replacement of console.log.
 */
(async () => {
  const cm = await consoleManager();
  cm.log(`This is a log message`);
})();

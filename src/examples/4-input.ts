import { consoleManager } from "..";
/**
 * Simplest use of this library.
 *
 * use ConsoleManager.log as a replacement of console.log.
 */
(async () => {
  const cm = await consoleManager();
  cm.log(`Initial log message`);

  const input = await cm.inputText("Please type some text", "", "Type something...");

  cm.log(`You said: ${input}`);

  const input2 = await cm.inputText("This time with default value", "default", "Type something...");

  cm.log(`You said: ${input2}`);
})();

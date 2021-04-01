import { consoleManager } from "..";
/**
 * Customize logging.
 */
(async () => {
  const cm = await consoleManager({
    bullets: {
      log: "🙂",
      info: "◼︎",
      success: "☑︎",
      warn: "❃",
      error: "😱",
    },
    bulletColors: {
      info: "yellow",
      success: "red",
    },
    textColors: {
      log: "rgb(255,255,0)",
      info: "cyan",
      success: "#55ff55",
      warn: "#FF00aa",
      error: "#aa00aa",
    },
  });
  cm.log(`This is a log message`);
  cm.info(`This is a info message`);
  cm.success(`This is a success message`);
  cm.warn(`This is a warn message`);
  cm.error(`This is a error message`);
})();

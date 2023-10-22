import puppeteer, { Browser } from "puppeteer";

let browserInstance: Browser | null;

const getBrowser = async () => {
  if (browserInstance) {
    return browserInstance;
  }

  browserInstance = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: "new"
  });

  return browserInstance;
};

export { getBrowser };

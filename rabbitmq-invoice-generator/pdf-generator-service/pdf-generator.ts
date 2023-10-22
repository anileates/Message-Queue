import { getBrowser } from "./helpers/browser.helper";
import path from "path";
import fs from "fs";
import mustache from "mustache";
import { PDFOptions } from "puppeteer";
import { produceSendEmailMessage } from "../producers";

const options: PDFOptions = {
  format: "A4",
  headerTemplate: "<p></p>",
  footerTemplate: "<p></p>",
  displayHeaderFooter: false,
  margin: {
    top: "40px",
    bottom: "100px",
  },
  printBackground: true,
};

const createInvoice = async (
  customerName: string,
  email: string,
  amount: string
) => {
  // Let's say generating a PDF takes a few minutes because it requires to calculate some financial data
  await new Promise((resolve) => setTimeout(resolve, 10000)); 

  const invoiceTemplate = fs.readFileSync(
    path.join(process.cwd(), "/templates/invoice.mustache"),
    "utf8"
  );

  let finalHtml = mustache.render(invoiceTemplate, {
    customerName,
    amount,
  });

  const browser = await getBrowser();

  const page = await browser.newPage();
  await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`);

  options.path = `../invoices/${customerName}.pdf`;
  await page.pdf(options);

  return await produceSendEmailMessage(customerName, email, options.path);
};

export { createInvoice };

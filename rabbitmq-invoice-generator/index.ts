import express, { Request, Response } from "express";
import { produceCreatePDFMessage } from "./producers";

const app = express();
app.use(express.json());

app.post("/create-invoice", async (req: Request, res: Response) => {
  const { customerName, email, amount } = req.body;

  // product a message to RabbitMQ to generate invoice
  await produceCreatePDFMessage(customerName, email, amount)

  res.status(200).json({
    message: "Your invoice is being generated. Please check your email in a few minutes.",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

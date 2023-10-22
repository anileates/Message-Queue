import amqp from "amqplib";
import { createInvoice } from "./pdf-generator";
import { produceSendEmailMessage } from "../producers";

const queue = "create-pdf-queue";
const amqpHost = "amqp://localhost:5672";

const consume = async () => {
  try {
    const connection = await amqp.connect(amqpHost);

    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    channel.consume(queue, async (msg) => {
      if (msg) {
        const data = JSON.parse(Buffer.from(msg?.content).toString());
        
        await createInvoice(data.customerName, data.email, data.amount);
        
        console.log(`Consumer: PDF Generated for: ${data.customerName}`)
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("An error happened: ", error);
  }
};

consume();
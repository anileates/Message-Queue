import amqp from "amqplib";

const amqpHost = "amqp://localhost:5672";
let pdfQueue = "create-pdf-queue";
let emailQueue = "email-queue";

const produceCreatePDFMessage = async (
  customerName: string,
  email: string,
  amount: string
) => {
  try {
    let msg = {
      customerName,
      email,
      amount,
    };

    const connection = await amqp.connect(amqpHost);
    const channel = await connection.createChannel();
    await channel.assertQueue(pdfQueue);

    channel.sendToQueue(pdfQueue, Buffer.from(JSON.stringify(msg)));
  } catch (error) {
    console.error("An error happened", error);
  }
};

const produceSendEmailMessage = async (customerName: string, email: string, filePath: string) => {
  try {
    let msg = {
      customerName,
      email,
      filePath
    };

    const connection = await amqp.connect(amqpHost);
    const channel = await connection.createChannel();
    await channel.assertQueue(emailQueue);

    channel.sendToQueue(emailQueue, Buffer.from(JSON.stringify(msg)));
  } catch (error) {
    console.error("An error happened", error);
  }
};

export { produceCreatePDFMessage, produceSendEmailMessage };

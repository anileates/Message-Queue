import amqp from "amqplib";
import sendMail from "./email.helper";

const queue = "email-queue";
const amqpHost = "amqp://localhost:5672";

const consume = async () => {
  try {
    const connection = await amqp.connect(amqpHost);

    const channel = await connection.createChannel();

    await channel.assertQueue(queue);

    channel.consume(queue, async (msg) => {
      if (msg) {
        const data = JSON.parse(Buffer.from(msg?.content).toString());

        const msg_id = await sendMail(data.email, data.filePath)

        console.log("Consumer: Email sent to: ", msg_id);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.log("An error happened: ", error);
  }
};

consume();

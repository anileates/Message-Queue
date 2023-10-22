import amqp from "amqplib";

const amqpHost = "amqp://localhost:5672";

const connect = async () => {
  try {
    const connection = await amqp.connect(amqpHost);
    const channel = await connection.createChannel();
    const queue = "first-queue";
    await channel.assertQueue(queue);

    await channel.consume(queue, (message) => {
      console.log(message?.content.toString());
      channel.ack(message as amqp.Message);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
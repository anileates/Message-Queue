import amqp from "amqplib";

const amqpHost = "amqp://localhost:5672";

let msg = {
  demo: "Message for first-queue from exchange",
};

let msg2 = {
  demo: "Message for second-queue from exchange",
};

const connect = async () => {
  try {
    const connection = await amqp.connect(amqpHost);
    const channel = await connection.createChannel();
    const channel2 = await connection.createChannel(); // gonna see the second channel

    // create queue
    const queue = "first-queue";
    await channel.assertQueue(queue);

    const seconQueue = "second-queue";
    await channel.assertQueue(seconQueue);

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));

    // Create custom exchange
    const exchange = "my-custom-exchange";
    /**
     * Fanout model pushes all the messages to all the queues that are bound to the exchange
     * Durable means that the queue will survive if broker restarts
     */
    await channel.assertExchange(exchange, "fanout", { durable: false });

    // Create another custom exchange
    const exchange2 = "my-custom-topic-exchange";
    await channel.assertExchange(exchange2, "topic", { durable: false }); // durable means that the queue will survive if broker restarts

    // Bind queue to exchange
    await channel.bindQueue(queue, exchange, "my-custom-routing-key");
    await channel.bindQueue(
      seconQueue,
      exchange,
      "my-second-custom-routing-key"
    );

    // Bind queue to exchange
    await channel.bindQueue(queue, exchange2, "my-custom-routing-key");
    await channel.bindQueue(
      seconQueue,
      exchange2,
      "my-second-custom-routing-key"
    );

    // This time do publish message to exchange using routing key instead sending to the queue directly
    // And let the exchange decide which queue to send the message
    for (let i = 0; i < 10; i++) {
      channel.publish(
        exchange2,
        "my-custom-routing-key",
        Buffer.from(JSON.stringify(msg))
      );
    }

    for (let i = 0; i < 20; i++) {
      channel.publish(
        exchange2,
        "my-second-custom-routing-key",
        Buffer.from(JSON.stringify(msg2))
      );
    }
  } catch (error) {
    console.log(error);
  }
};

connect();

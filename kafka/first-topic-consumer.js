const { Kafka } = require("kafkajs");

const createConsumer = async () => {
  try {
    const kafka = new Kafka({
      clientId: "my-first-client",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({
      groupId: "my-consumer-group-1",
    });
    await consumer.connect();
    console.log("Consumer connected successfully");

    await consumer.subscribe({
      topic: "first-topic",
      fromBeginning: true, // Read from the beginning of the topic
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Msg: ${result.message.value}, partition ${result.partition}`
        );
      },
    });
  } catch (error) {
    console.log("Error: ", error);
  }
};

createConsumer();

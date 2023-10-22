const { Kafka } = require("kafkajs");

const createTopic = async () => {
    try {
        const kafka = new Kafka({
            clientId: "my-first-client",
            brokers: ["localhost:9092"],
        });
        
        const admin = kafka.admin();
        await admin.connect();

        await admin.createTopics({
            topics: [
                {
                    topic: "first-topic",
                    numPartitions: 1,
                },
                {
                    topic: "second-topic",
                    numPartitions: 2,
                }
            ],
        });

        console.log("Topics created successfully");
        await admin.disconnect();
    } catch (error) {
        console.log('Error: ', error)
    } finally {
        process.exit(0);
    }
};

createTopic();
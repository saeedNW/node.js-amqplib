/** importing the amqplib library for working with RabbitMQ */
const amqplib = require("amqplib");

/**
 * asynchronous function to send a message to a RabbitMQ task queue
 */
async function sendMsgToTask() {
	/**
	 * define a name for the RabbitMQ queue
	 */
	const queueName = "task";

	/**
	 * establishing a connection to the RabbitMQ server
	 */
	const connection = await amqplib.connect("amqp://localhost:5672");

	/** creating a channel for communication over the connection */
	const channel = await connection.createChannel();

	/**
	 * asserting the existence of the task queue,
	 * setting it as durable to survive server restarts
	 */
	await channel.assertQueue(queueName, { durable: true });

	/**
	 * Sending a message to the task queue, converting a
	 * string message to a Buffer
	 */
	channel.sendToQueue(queueName, Buffer.from("task message"), {
		/** ensuring message persistence even if RabbitMQ server restarts */
		persistent: true,
	});

	/** logging a message indicating successful message transmission */
	console.log("Message has been sent to the task queue");
}

/**
* sending 15 messages to the task queue using the sendMsgToTask function.
* the propose of this loop is to test if the queue process will be divided
* between consumers successfully, in order to check this you need to start
* three instants of the consumer and then run the producer to see the
* result of dividing the process. 
*/
for (let index = 0; index < 15; index++) {
	sendMsgToTask()
		.then(() => {})
		.catch((err) => console.error(err.message));
}

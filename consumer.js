/** importing the amqplib library for working with RabbitMQ */
const amqplib = require("amqplib");

/**
 * Asynchronous function to receive messages from a RabbitMQ task queue
 */
async function receiveFromProducer() {
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

	/** initializing an index variable to keep track of received messages */
	let index = 0;

	/** consuming messages from the task queue */
	await channel.consume(queueName, (msg) => {
		/** generating a random timeout for simulating variable processing times */
		const randomNum = Math.floor(Math.random() * 10);
		const timeOut = randomNum * 1000;

		/**
		 * delaying the processing of the message to simulate variable task durations
		 */
		setTimeout(() => {
			/** logging the timeout and the received message content */
			console.log(timeOut);
			console.log(index, msg.content.toString());

			/**
			 * incrementing the message index and acknowledging the message receipt
			 * after acknowledging the message receipt the message will be removed
			 * from RabbitMQ queue.
			 */
			index++;
			channel.ack(msg);
		}, timeOut);
	});
}

/** initiating the message receiving process */
receiveFromProducer()
	.then(() => {})
	.catch((err) => console.error(err.message));

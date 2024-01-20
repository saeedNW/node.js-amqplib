# Node.js-amqplib Project

This Node.js project, named `node.js-amqplib`, is a practical implementation
for learning how to work with RabbitMQ using the `amqplib` library.
The project consists of two main files: `producer.js` and `consumer.js`.
The purpose of this project is to demonstrate basic interactions with
RabbitMQ, specifically the creation of a task queue and the communication
between a producer and multiple consumers.

## Project Structure

- `producer.js`: This file contains the code for sending messages to a
  RabbitMQ task queue. It establishes a connection to the RabbitMQ server,
  creates a channel, and sends messages to the specified queue.
  The `sendMsgToTask` function is responsible for sending a message, and
  the script runs this function 15 times to simulate the distribution of
  tasks among consumers.

- `consumer.js`: This file focuses on receiving messages from the RabbitMQ
  task queue. It establishes a connection to the RabbitMQ server, creates a
  channel, and consumes messages from the specified queue (`task`).
  The `receiveFromProducer` function simulates variable processing times by
  introducing random timeouts. Each received message is processed after the
  simulated timeout, and the consumer acknowledges the receipt, removing the
  message from the queue.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Setting Up RabbitMQ

To start RabbitMQ using Docker, run the following command:

```shell
docker run -d -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.12-management
```

### Installation and Setup

1. Clone the repository from GitHub:

   ```shell
   git clone https://github.com/saeedNW/node.js-amqplib.git
   ```

2. Navigate to the project directory:

   ```shell
   cd node.js-amqplib
   ```

3. Install project dependencies:

   ```shell
   npm install
   ```

4. **Run Consumers**: Start multiple instances (recommended: 3) of the
   consumer script in separate terminals. This can be done using the
   following command:

   ```shell
   node consumer.js
   ```

5. **Run Producer**: Execute the producer script to send messages to the
   RabbitMQ task queue. This can be done with the following command:

   ```shell
   node producer.js
   ```

   Observing the output of the consumers will demonstrate how the tasks
   are distributed among them.

## Notes

- This project was developed as a practice exercise for a Node.js learning
  course, and the code reflects basic interactions with RabbitMQ using
  the `amqplib` library.

## Contributors

We would like to thank the following individuals who have contributed to the
development of this project:

![avatar](https://images.weserv.nl/?url=https://github.com/erfanyousefi.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)
‎ ‎
‎ ![avatar](https://images.weserv.nl/?url=https://github.com/saeedNW.png?h=150&w=150&fit=cover&mask=circle&maxage=5d)

[**Erfan Yousefi - Supervisor and instructor of the node.js programming course**](https://github.com/erfanyousefi/)

[**Saeed Norouzi - Back-end Developer**](https://github.com/saeedNW)

import amqp, { Message } from 'amqplib/callback_api';
import { Queue } from './types';

amqp.connect('amqp://Guest:Guest@localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		ch.assertQueue(Queue.name, { durable: false });
		ch.prefetch(1);

		console.log(
			' [*] Waiting for messages in %s. To exit press CTRL+C',
			Queue.name
		);

		ch.consume(
			Queue.name,
			(msg: Message | null) => {
				console.log(' [x] Received %s', msg?.content.toString());
			},
			{ noAck: true }
		);
	});
});

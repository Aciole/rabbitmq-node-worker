import amqp from 'amqplib/callback_api';
import { Buffer } from 'buffer';
import { Queue } from './types';

amqp.connect('amqp://Guest:Guest@localhost', (err, conn) => {
	conn.createChannel((err, ch) => {
		let i = 0;
		setInterval(() => {
			i += 1;
			const msg = `Hello world ${i}`;

			ch.assertQueue(Queue.name, { durable: false });

			ch.sendToQueue(Queue.name, new Buffer(msg));

			console.log(' [x] Send %s', msg);
		}, 100);
	});

	setTimeout(function () {
		conn.close();
		process.exit(0);
	}, 10000);
});

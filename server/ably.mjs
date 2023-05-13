import Ably from 'ably';

const ably = new Ably.Realtime({ key: process.env.ABLY_APIKEY });

async function connectAbly() {
  await ably.connection.once('connected');
  console.log('Connected to Ably!');
}

export { ably, connectAbly };

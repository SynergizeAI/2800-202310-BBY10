import Ably from 'ably';

const ably = new Ably.Realtime({ key: process.env.ABLY_APIKEY });

function connectAbly() {
  return new Promise((resolve, reject) => {
    ably.connection.once('connected', resolve);
    ably.connection.once('failed', reject);
  });
}


export { ably, connectAbly };

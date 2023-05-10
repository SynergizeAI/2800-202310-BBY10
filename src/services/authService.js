import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config({ path: ('../../.env') });

const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

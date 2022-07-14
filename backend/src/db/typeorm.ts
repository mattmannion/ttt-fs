import { createConnection } from 'typeorm';

export default async function TypeOrmInit() {
  try {
    await createConnection();
    console.log('db connected');
  } catch (error) {
    console.log('connection failed');
    console.log((<Error>error).message);
  }
}

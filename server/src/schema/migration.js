import '@babel/polyfill';
import { pool } from '../models';
import log from '../utils/log';

const migration = async () => {
  try {
    const dropTbales = `
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS trips CASCADE;
    DROP TABLE IF EXISTS buses CASCADE;
    DROP TABLE IF EXISTS bookings CASCADE`;

    const createTables = `
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false,
      created_on TIMESTAMP NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS trips(
      id SERIAL PRIMARY KEY,
      bus_id INTEGER NOT NULL,
      origin TEXT NOT NULL,
      destination TEXT NOT NULL,
      trip_date TIMESTAMP NOT NULL DEFAULT NOW(),
      fare NUMERIC(6, 2) NOT NULL,
      status TEXT DEFAULT 'active' NOT NULL
    );

    CREATE TABLE IF NOT EXISTS buses(
      id SERIAL PRIMARY KEY,
      number_plate TEXT UNIQUE NOT NULL,
      manufacturer TEXT NOT NULL,
      model TEXT NOT NULL,
      capacity INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bookings(
      id SERIAL PRIMARY KEY,
      trip_id INTEGER NOT NULL,
      user_id INTEGER NOT NULL,
      created_on TIMESTAMP NOT NULL DEFAULT NOW(),
      FOREIGN KEY (trip_id) REFERENCES trips(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    `;

    log('Dropping tables...');
    await pool.query(dropTbales);
    log('Tables dropped successfully!');

    log('Creating tables...');
    await pool.query(createTables);
    log('Tables created successfully!');
  } catch (error) {
    log(error.message);
  }
};

export default migration;

migration();

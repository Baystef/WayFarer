import { Pool, types } from 'pg';
import { config } from 'dotenv';
import log from '../utils/log';

const env = process.env.NODE_ENV;

types.setTypeParser(1700, value => parseFloat(value));
log(env);
if (process.env && env === 'test') {
  config({ path: `.env.${env}` });
} else {
  config();
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  log(`Connection successful to::::${process.env.DATABASE_URL}`);
});

class Model {
  constructor(table) {
    this.table = table;
    this.pool = pool;
    this.pool.on('error', (err) => {
      log('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  async select(columns, clause) {
    const query = `SELECT ${columns} FROM ${this.table} ${clause}`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async insert(columns, values, clause) {
    const query = `INSERT INTO ${this.table}(${columns}) VALUES(${values}) ${clause}`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async update(columns, clause) {
    const query = `UPDATE ${this.table} SET ${columns} ${clause}`;
    const data = await this.pool.query(query);
    return data.rows;
  }

  async delete(clause) {
    const query = `DELETE FROM ${this.table} ${clause}`;
    const data = await this.pool.query(query);
    return data.rows;
  }
}

export { pool, Model };

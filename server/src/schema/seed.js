import { pool } from '../models';
import { Auth, log } from '../utils';

const password = Auth.hash('whykilmydog12');

const seed = async () => {
  try {
    const seedTables = `
  INSERT INTO users (first_name, last_name, email, password) VALUES ('John', 'Dog', 'john@yahoo.com', '${password}');
  INSERT INTO users (first_name, last_name, email, password) VALUES ('Wick', 'Maiden', 'wick@gmail.com', '${password}');
  INSERT INTO users (first_name, last_name, email, password) VALUES ('James', 'Morris', 'jmorris@hotmail.com', '${password}');
 
  INSERT INTO buses (number_plate, manufacturer, model, capacity) VALUES ('DV345BG', 'Volvo', 'AR150', 30);
  INSERT INTO buses (number_plate, manufacturer, model, capacity) VALUES ('DV345BD', 'Mercedes', 'Marcopolo', 30);
  INSERT INTO buses (number_plate, manufacturer, model, capacity) VALUES ('DV345BC', 'Toyota', 'Hilux', 30);

  INSERT INTO trips (bus_id, origin, destination, fare) VALUES (1, 'Ipaja', 'Lekki', 200);
  INSERT INTO trips (bus_id, origin, destination, fare) VALUES (2, 'Ijaiye', 'Magodo', 300);
  INSERT INTO trips (bus_id, origin, destination, fare) VALUES (3, 'Oshodi', 'FESTAC', 500);
  `;

    log('Seeding Tables...');
    await pool.query(seedTables);
    log('Tables seeded successfully!');
  } catch (error) {
    log(error.message);
  }
};

export default seed;

seed();

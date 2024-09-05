import mysql from "mysql2/promise";
import  dotenv from "dotenv";

dotenv.config();
console.log(process.env.DB_USER);
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 2,
});


const queryDatabase = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM contacts');
    console.log(rows);
  } catch (err) {
    console.error('Query error:', err);
  }
};

queryDatabase();


export default pool; 

import { TContact } from '../types/types';
import pool from '../db'
import { RowDataPacket, ResultSetHeader } from 'mysql2';


const createContact = async(first_name: string, last_name: string, mobile_number: string, email:string) => {
  const [existingResult] = await pool.query<TContact[] & RowDataPacket[]>(
    'select * from contacts where email=?',[email]
  )
  if(existingResult.length > 0){
    console.log(existingResult);
    return `user with email: ${email} already exists`;
  }
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO contacts (first_name,last_name,mobile_number,email) VALUES (?,?,?,?)',[first_name,last_name,mobile_number,email]
  );
  return result.insertId;
}

const getContact = async(id: string) => {
  const [result] = await pool.query(
    'select * from contacts where id=?',[id]
  )
  return result;
}

const updateContact = async(id:string,mobile_number:string,email:string) => {
  const [result] = await pool.query(
    'update contacts set email=?,mobile_number=? where id=?',[email,mobile_number,id]
  )
  return result;
}

const deleteContact = async(id:string) => {
  const [result] = await pool.query(
    'delete from contacts where id=?',[id]
  )

  return result;
}


export default { createContact, getContact, updateContact, deleteContact};
import dotenv from "dotenv"
import { TContact, TDataStore } from "../types/types";
import contactDB from "../db/contactDB";

dotenv.config();


const url = process.env.url;

const createContact = async(first_name: string,last_name:string,email: string,mobile_number: string,data_store:TDataStore) => {
  if(data_store == 'CRM'){
    const contact : TContact = {first_name,last_name,email,mobile_number} 
    return await fetch(url+`api/contacts`,{
      method: "POST",
      headers: {
        "Authorization": "Token token=veJ7esypLev0VfX1CkaIdQ",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(contact)
    })
  }
  else{
    return await contactDB.createContact(first_name,last_name,mobile_number,email);
  }
}


const getContact = async(id: string,data_store:TDataStore) => {
  if(data_store == "CRM"){
    return await fetch(url+`api/contacts/${id}`,{
      method: "GET",
      headers: {
        "Authorization": "Token token=veJ7esypLev0VfX1CkaIdQ",
      "Content-Type": 'application/json'
    },
  }) 
  }
  else{
    return await contactDB.getContact(id);
  }
}


const updateContact = async(id:string,mobile_number:string,email:string,data_store:TDataStore ) => {
  const contact = { mobile_number,email }
  if(data_store == "CRM"){
    return await fetch(url+`api/contacts/${id}`,{
      method: "PUT",
      headers: {
        "Authorization": "Token token=veJ7esypLev0VfX1CkaIdQ",
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(contact)
    }) 
  }
  else{
    return await contactDB.updateContact(id,mobile_number,email);
  }
}


const deleteContact = async(id: string,data_store:TDataStore) => {
  if(data_store == "CRM"){
    return await fetch(url+`api/contacts/${id}`,{
      method: "DELETE",
      headers: {
        "Authorization": "Token token=veJ7esypLev0VfX1CkaIdQ",
        "Content-Type": 'application/json'
      },
    }) 
  }
  else{
    return await contactDB.deleteContact(id);
  }
}


export default {
  createContact,
  getContact,
  updateContact,
  deleteContact
}
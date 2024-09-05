import { Request, Response } from "express"
import { TContactBody, TDataStore } from "../types/types";
import contactRepos from "../repos/contactRepos";



const createContact = async(req: Request, res: Response) => {
  const contact: TContactBody  = req.body;
  try{
    console.log(JSON.stringify({contact}))
    const response = await contactRepos.createContact(contact.first_name,contact.last_name,contact.email,contact.mobile_number,contact.data_store)
    if(contact.data_store === 'CRM'  ){
      const data = await (response as any).json();
      res.status(201).json({contact: data})
    }else{
      res.status(201).json({contact: response})
    }
  }
  catch(e){
    res.status(500).json({error: e});
  }
}


const getContact = async(req: Request, res: Response) => {
  const {id}  = req.params;
  const {data_store} = req.body
  try{
    const response = await contactRepos.getContact(id,data_store);
    if(data_store == "CRM"){
      const data = await (response as any).json();
      res.status(200).json({contact: data})
    }else{
      res.status(200).json({contact: response})
    }
  }
  catch(e){
    res.status(500).json({error: e});
  }
}


const updateContact = async(req: Request, res: Response) => {
  const {id}  = req.params;
  const contact : {mobile_number: string,email: string,data_store: TDataStore} = req.body;
  try{
    const response = await contactRepos.updateContact(id,contact.mobile_number,contact.email,contact.data_store);
    if(contact.data_store == "CRM"){
      const data = await (response as any).json();
      res.status(200).json({contact: data})
    }else{
      res.status(200).json({contact: response})
    }
  }
  catch(e){
    res.status(500).json({error: e});
  }
}


const deleteContact = async(req: Request, res: Response) => {
  const {id}  = req.params;
  const contact : {data_store: TDataStore} = req.body;
  try{
    const response = await contactRepos.deleteContact(id,contact.data_store);
    if(contact.data_store == "CRM"){
      const data = await (response as any).json();
      res.status(200).json({contact: data})
    }else{
      res.status(200).json({contact: response})
    }
  }
  catch(e){
    res.status(500).json({error: "Either contact doesn't exist or error while deleting"});
  }
}


export default {
  createContact,
  getContact,
  updateContact,
  deleteContact
}
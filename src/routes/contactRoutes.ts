import express from "express"
import contactControllers from "../controllers/contactControllers";

export const contactRouter = express.Router();


contactRouter.post('/getContact/:id',contactControllers.getContact)
contactRouter.post('/createContact',contactControllers.createContact)
contactRouter.put('/updateContact/:id',contactControllers.updateContact)
contactRouter.delete('/deleteContact/:id',contactControllers.deleteContact)
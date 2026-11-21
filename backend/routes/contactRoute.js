const express = require("express")
const app=express()
const ContactModel = require("../models/contactModel.js")
app.post("/addContact", async(req,res)=>{
    try{
        let getInfos=req.body
        let newContact = new ContactModel(getInfos)
        await newContact.save()
        console.log(newContact)
        res.status(200).send(newContact)

    }catch(err){
        res.status(500).send("Not added")
        console.log("Not added contact: "+err)

    }
})
module.exports = app


//const contactmodel nje emer i vendosur nga ne kot
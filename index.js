import Connection from "./database/db.js"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import User from "./schema/user_schema.js"



const app= express();
const PORT = process.env.PORT || 3001

dotenv.config();

const username = process.env.USER;
const password = process.env.PASSWORD;

Connection(username,password);



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));



app.get("/read" , async (req,res)=>{
    try {
        const users = await User.find({})
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        res.json({message: error.message})
    }
                    
})
    



app.delete('/delete/:id',async (req,res)=>{

    try {
        const id = req.params.id
        console.log(id)
        const users = await User.deleteOne({_id : id})
        res.status(200).json(users);

    } catch (error) {
        res.status(404).json({message:error.message});        
    }
    
})



app.delete('/deleteAll',async (req,res)=>{
    try {
        const users = await User.deleteMany()
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message:error.message});        
    }
})


app.listen(PORT , ()=>{
    console.log(`Server is runing on port ${PORT} `)
})

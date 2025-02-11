require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(express.json())


app.use(cors({
    origin: 'http://localhost:4200', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log("db connected"))
.catch((err) => console.log(`error while connectiong to the db ${err}`))

const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : true,
        maxlength : 35,
        validate: {
            validator: function(value) {
                return /^[A-Za-z]/.test(value); 
            },
            message: "First name must start with an alphabet."
        }
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 35,
        validate: {
            validator: function(value) {
                return /^[A-Za-z]/.test(value); 
            },
            message: "Last name must start with an alphabet."
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, 
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
            validator: function(value) {
                // Password must have at least one uppercase, one special character, and one number
                return /[A-Z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*(),.?":{}|<>]/.test(value);
            },
            message: "Password must contain at least one uppercase letter, one number, and one special character."
        }
    },
    createdDate: {
        type: String,
        default: new Date().toISOString() // UTC format for created date
    },
    updatedDate: {
        type: String,
        default: new Date().toISOString() // UTC format for updated date
    }
})

const user = new mongoose.model("user" , userSchema , "users")

app.post("/add" , async(req , res ) => {
    const {first_name , last_name, email,password} = req.body
    try{
        const existringUser = await user.findOne({email})
        if(existringUser){
            return res.status(400).json({message : "eamil elready exist"});
        }

        const createdDate = new Date().toISOString();
        const updatedDate = new Date().toISOString(); 

        const newUser = new user({
            first_name,
            last_name,
            email,
            password,
            createdDate,
            updatedDate
        })

        console.log(newUser)
        await newUser.save();
        return res.status(200).json({
            message : "User created successfully",
            user : newUser
        })
    }
    catch (err) {
        console.error("Error during user creation:", err); 
        return res.status(500).json({ message: "Error while creating the user", error: err });
      }
})

app.listen(process.env.PORT, () => {
    console.log("server running at http://localhost:3000");
})
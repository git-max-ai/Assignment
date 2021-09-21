
const express=require('express')
const app=express()
const path = require('path');
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cors=require('cors')
const formidable=require('formidable')
const fs=require('fs')



//connection with mongodb

mongoose.connect(`mongodb://dbKanak:Mongodb%402003@cluster0-shard-00-00.igeib.mongodb.net:27017,cluster0-shard-00-01.igeib.mongodb.net:27017,cluster0-shard-00-02.igeib.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-50r7yk-shard-0&authSource=admin&retryWrites=true&w=majority`, {useNewUrlParser: true})
.then(response=>{
    console.log('DB CONNECTED')
}).catch(err=>console.log("Unable to connect with DB"));



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    course:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    roll:{
        type:Number,
        required:true
    },
    phone:{
        type:Number,
        required:true
    }
})

const User=mongoose.model('User', userSchema)



//middleware

app.use(bodyParser.json())
app.use(cors())


const userData=(req,res)=>{
    const form=new formidable.IncomingForm();

    form.parse(req,(err,fields,file)=>{
        if(fields){
            const{name,course,phone,roll,email}=fields
            if(!name || !course || !phone || !roll || !email){
                return res.status(400).json({
                    error:"Fill all the fields"
                })
            }
        }

        if(file.photo){
            if(file.photo.size>4000000){
                return res.status(400).json({
                    error:"Image size is too long"
                })
            }
            const user=new User(fields)
            user.photo.data=fs.readFileSync(file.photo.path)
            user.photo.contentType=file.photo.type

            user.save((err,user)=>{
                if(err){
                    return res.status(400).json({
                        error:"Not save in DB"
                    })
                }
                return res.json(user)
            })
        }
    })
}

//router

app.post('/userdashboard', userData)

if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port=process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`App is running at ${port}`)
}) 

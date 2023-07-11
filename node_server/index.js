const express = require('express');
const cors = require('cors')
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/demo');
    console.log('db connected');
}

const userSchema = new mongoose.Schema({
    username: String,
    password : String
});

const User = mongoose.model('User', userSchema);


server.use(cors());
server.use(bodyParser.json());

// CRUD = creat
server.post('/demo',async(req,res)=>{
    // save in db
    let user = new User();
    user.username = req.body.username   ;
    user.password = req.body.password;
   const doc = await user.save();

    console.log(doc);

    res.json(req.body);
});

// CRUD = read
server.get('/demo' ,async (req,res)=>{

    const docs = await User.find({});
    res.json(docs);
    

})

server.listen(8080,(req,res)=>{
    console.log('server started');
})
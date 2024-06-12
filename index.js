const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./modules/chat.js");
const methodOverride = require('method-override');
const ExpressError=require("./ExpressError");

 
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'))

app.set("views",path.join(__dirname,"views"));//THIS USED FOR USE THE VIEWS FOLDER
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));// BY USING THIS MIDDLEWARE WE CAN ACCESS PUBLIC FOLDER FOR STATIC PART
app.use(express.urlencoded({extended:true}));// is used to parse incoming requests with URL-encoded 

main()
.then(()=>{
    console.log("Connection is succcessfull");
})
.catch((err) => console.log(err));

async function main()
{
  await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//Index Route

app.get("/Chats",async(req,res,next)=>{
    try{
        let chats=await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});

    }catch(err){
        next(err);
    }
    
});


//NEW ROUTE

app.get("/chats/new",(req,res,next)=>{
    try{
        res.render("new.ejs")
    }
    catch(err){
        next(err);
    }
  
})

//create route

app.post("/chats", asyncWrap(async (req, res, next) => {
  
        let { from, to, msg } = req.body;
        let newChat = new Chat({
            from: from,
            to: to,
            msg: msg,
            created_at: new Date(),
        });

        await newChat.save();
        res.redirect("/chats");
    
}));

function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
}
//new-show  ROUTES

app.get("/chats/:id",asyncWrap(async(req,res,next)=>{
   
        let { id }=req.params;
    let chat =await Chat.findById(id);
    if(!chat){
           return next(new ExpressError(404, "Chats is not found"));
        }
        res.render("edit.ejs",{chat});
    
}));

//Edit route 
app.get("/chats/:id/edit",asyncWrap(async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
}));

//upaddet
app.put("/chats/:id",asyncWrap(async(req,res)=>{
  
        let{id}=req.params;
    let{msg :newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidator:true , new:true }
    );
    console.log(updatedChat);
    res.redirect("/chats");
    
}));

//Delete the chat

app.delete("/chats/:id",asyncWrap(async (req,res)=>{
    
        let{id}=req.params;
        let deleteChat=await Chat.findByIdAndDelete(id);
        console.log(deleteChat);
        res.redirect("/chats")

   
}));

// let chat1=new Chat({
//     from:"neha",
//     to:"Vaishnavi",
//     msg:"Send me Your Exam Sheets",
//     created_at:new Date(),
// });

// chat1.save().then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });


app.get("/",(req,res)=>{
    res.send("Server is working");
});
const handlevalidationErr=(err)=>{
    console.log("This is Validation Error, please Follow rules ");
    console.dir(err.message);
    return err;
}
app.use((err,req,res,next)=>{
    console.log(err.name);
    if(err.name=="ValidationError"){
       handlevalidationErr(err);
    }
    next(err);
})
//404 handler
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

//Error handling middleware
app.use((err ,req ,res,next)=>{
    let {status=500 ,message="Some Error Occurred "}=err;
    res.status(500).send(message);
})

app.listen(8080,()=>{
    console.log("Server is listening to the Port 8080")
})
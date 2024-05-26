const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./modules/chat.js")


main()
.then(()=>{
    console.log("Connection is succcessfull");
})
.catch((err) => console.log(err));

async function main()
{
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
Chat.insertMany([
    {
    from:"neha",
    to:"Vaishnavi",
    msg:"Send me Your Exam Sheets",
    created_at:new Date(),
},
{
    from:"Ajay",
    to:"Neha",
    msg:"Questions of how work",
    created_at:new Date(),
},
{
    from:"Vaijay",
    to:"Vaishnavi",
    msg:"Teach me call back",
    created_at:new Date(),
}
]);

// .save().then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// });


//  let texts=["cook food","eat food","serve food"];
const express = require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
const ejs=require('ejs');
// const ejslint=require('ejs-lint');
app.set('view engine','ejs');
mongoose.connect('mongodb://127.0.0.1:27017/todolistdb');
const itemschema=new mongoose.Schema({
  name:String
})
const item=mongoose.model('item',itemschema);
const cloth=new item({
   name:"cloth"
});
const fruit=new item({
  name:"fruits"
})
const home=new item({
  name:"home"
})
const defaultarr=[cloth,fruit,home];


app.get("/",(req,res)=>{
 
       item.find({}).then((itemdocument)=>{
        
        if(itemdocument.length===0){
          item.insertMany(defaultarr).then(()=>{
            console.log("succesfully inseted items!");
         }).catch((err)=>{
            console.log(err);
         })
         res.redirect("/");
        }
        else{
          res.render("list",{today:"Today",newitems:itemdocument})
        }
       })
})
app.post("/",(req,res)=>{
    let newtext=req.body.txt;
    const newitem=new item({
      name:newtext
    })
    newitem.save();
    res.redirect("/");
})
app.post("/delete",(req,res)=>{
  const checkboxitemid=req.body.checkbox;
   item.findByIdAndDelete(checkboxitemid).then(()=>{
     console.log("successfully deleted!");
     res.redirect("/");
   }).catch((err)=>{
     console.log(err);
   })
  
})
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})


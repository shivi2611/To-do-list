const express= require("express");
const app=express();
const bodyParser= require("body-parser");
const mongoose= require('mongoose');
require('dotenv').config()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true});

const itemsSchema=new mongoose.Schema({
  name: String,
});

const item=new mongoose.model("item", itemsSchema);
const listSchema = {
  name: String,
  items: [itemsSchema]
};
const List = mongoose.model("List", listSchema);

app.get('/', (req, res) => {
    const d = new Date();
    let day = d.getDay();
    switch(day) {
        case 0:
           day="Sunday"
          break;
        case 1:
           day="Monday"
          break;
          case 2:
            day="Tuesday"
           break;
         case 3:
            day="Wednesday"
        case 4:
           day="Thursday"
          break;
        case 5:
           day="Friday"
           break;
        case 6:
           day="Saturday"
      }
      item.find()
      .then(function(listItems){
        res.render('index', {day: day, listItem:listItems, size:listItems.length});
      })
      .catch(function(err){
        console.log(err);
      })
  });
  app.post("/", function(req, res){
    const task={
      name: req.body.newItem
    };
    const listName = req.body.list;
    if(task.name!=""){
      item.insertMany([task]);
    }
    res.redirect("/");
})
app.post("/delete", function(req, res){
  item.findByIdAndRemove(req.body.checkbox)
  .exec()
  .then(removedDoc => {
    res.redirect("/");
  })
  .catch(error => {
    console.log(error);
  });
})
app.listen(process.env.PORT, function(){
    console.log("server has started");
})
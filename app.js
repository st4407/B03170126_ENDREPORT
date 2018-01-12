var ex =require("express");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = ex();
mongoose.connect("mongodb://test1:test1@ds013881.mlab.com:13881/db5");
var data1= [{item:"A"},{item:"B"},{item:"C"},{item:"D"},{item:"E"},{item:"F"}];
var todoSchema = new mongoose.Schema({
  label:String,
  comment:String,
  date:String
});

var Todo = mongoose.model('todo', todoSchema);

app.set("view engine", "ejs");
app.get ("/",function(req,res){
 res.render("index");
});

app.get('/contact',function(req, res){
  Todo.find({}, function(err, data){
    if(err) throw err;
    console.log('server start at get /todo..');
          console.log(data);
    res.render('contact', {data:data});
  });
});


app.get('/todo', function(req, res){
    res.render('todo');
});
  app.post('/todo', urlencodedParser, function(req, res){
  var newTodo = Todo(req.body).save(function(err, data){
    if (err) throw err;
    console.log('server  at post /todo..');
    res.redirect('/todo');
  });

});
console.log("listen *8080");
app.listen(8080);

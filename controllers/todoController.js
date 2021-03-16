
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connecting mongodb
mongoose.connect('mongodb+srv://admin2:inicoba@todo.egy3c.mongodb.net/todo?retryWrites=true&w=majority', 
    {useNewUrlParser: true, useUnifiedTopology: true}, function(){
        console.log("Mongoose connected");
    } );

// create schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);



var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){
    app.get('/todo', function(req,res){
        // get data from mongodb
        Todo.find({}, function(err, data){
            if(err) {
                throw err
            };
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, function(req,res){
        // get data from the view to post to mongo
        var newTodo = Todo(req.body).save(function(err, data){
            if(err) {
                throw err
            };
            res.json(data);
        });
    });

    app.delete('/todo/:item', function(req,res){
        // delete from item from mongo
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
            if(err) {
                throw err
            };
            res.json(data);
        });
    });
};
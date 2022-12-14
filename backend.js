const cors = require('cors');

const express = require('express');
const app = express();
const port = 5000;
var counter = {"count":0};

//extremely insecure to open cors to all origins, but just use now for development purposes
app.use(cors());

app.use(express.json());

//Home Page
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Bouncer',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }

 //Responds with users by query
 app.get('/users', (req, res) => {

   const name = req.query.name;
   const job = req.query.job;

   if(name && job){
      let result = findUserByName(name);
      result = findUserByJob(job);
      result = {users_list: result};
      res.send(result);
   }
   else if(name){
      let result = findUserByName(name);
      result = {users_list: result};
      res.send(result);
   }
   else if(job){
      let result = findUserByJob(job);
      result = {users_list: result};
      res.send(result);
   }
   else
      res.send(users);
 });

 //Returns users with given name
 const findUserByName = (name) => {
   return users['users_list'].filter( (user) => user['name'] === name);
 };

 //Returns users with given job
 const findUserByJob = (job) => {
   return users['users_list'].filter( (user) => user['job'] === job);
 };

 //Responds with user by id
 app.get('/users/:id', (req, res) => {
   const id = req.params.id;
   let result = findUserById(id);
   if(result === undefined || result.length == 0)
      res.status(404).send('Resource not found.');
   else{
      result = {users_list: result}
      res.send(result);
   }
 })
 
// Returns user with given id
 const findUserById = (id) => {
   return users['users_list'].find( (user) => user['id'] === id);
 };
 
 //Add user by POST
 app.post('/users/', (req, res) => {
   const newUser = req.body;
   newUser.id = ++counter.count;
   addUser(newUser);
   res.status(201).send(newUser);
   
 })

 function addUser(user){
   users['users_list'].push(user);
 }

 //DELETE user
 app.delete("/users/", (req, res) => {

   console.log(req.body.id);
   const index = users["users_list"].indexOf(findUserById(req.body.id));
   console.log(index);
   if(index === -1){
      res.status(404).end("Resource not found.");
   }

   else{
      users["users_list"].splice(index, 1)
      res.status(204).send();
   }  
}
)



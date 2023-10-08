const express = require ('express');
const fs = require('fs');
const users = require('./MOCK_DATA.json');
const app= express();
const port= 3001;

let ReqNo=0;

function middleware(req,res,next) {
  console.log("I am middleware");
  ReqNo++;
  console.log("Req No : " + ReqNo);
  next();
}

app.use(middleware)
app.use(express.json());  // take input as json data
app.use(express.urlencoded({ extended:false }));//take input as html form data

app.get('/',(req,res) =>{
  res.send('Hello from server');
  res.send(200);
});


app.get('/handlesum', (req, res) =>{
  let finalsum=0;
  let upto=req.body.counter;
  for(let i=0; i<=upto; i++) {
    finalsum = finalsum +i;
  }
let ans = `Sum is ${finalsum}`;
let obj={sum:ans}
res.json(obj);
})

app.get('/api/users', (req, res)=> {
  res.send(users);
})

app.get('/users', (req, res)=> {
  const html = `
  <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`).join('')}
  </ul>`;
  res.send(html);
})

app.route('/api/users/:id')
   .get((req,res)=>{
        const reqid = Number(req.params.id);
        console.log("requested id is:",reqid);
        const user = users.find((user) => user.id === reqid);
        return res.json(user);
      })
    
    .patch((req,res)=>{
      const reqid = Number(req.body.id);
      const update= req.body;
      return res.json({status:"pendings"});
    })
    .delete((req,res)=>{

      return res.json({status:"pending"});
    });

app.post('/api/users',(req,res)=>{
  const body = req.body;
  //console.log("entered data is:",newUser);
  users.push({...body, id:users.length+1}); // add body to users array as it but change id no
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) => {
    return res.json({ststus:"success", id:users.length});
  })
  
})  


app.listen(port, ()=>{
console.log('listening on port: ',+port);
});
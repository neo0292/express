const express = require ('express');
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
app.use(express.json());

app.get('/',(req,res) =>{
  res.send('Hello from server');
  res.send(200);
});

/*function handlesum(req, res) {
  let finalsum=0;
  let upto=req.query.counter;
  for(let i=0; i<=upto; i++) {
    finalsum = finalsum +i;
}
let ans = `Sum is ${finalsum}`;
res.send(ans);
}*/
app.post('/handlesum', (req, res) =>{
  let finalsum=0;
  let upto=req.body.counter;
  for(let i=0; i<=upto; i++) {
    finalsum = finalsum +i;
}
let ans = `Sum is ${finalsum}`;
let obj={sum:ans}
res.json(obj);
})


app.listen(port, ()=>{
console.log('listening on port: ',+port);
});
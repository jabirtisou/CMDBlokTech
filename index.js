
const express = require('express')
const app = express()
const port = 3000


const users = [{
  "firstName": "Anna",
  "lastName": "Alexandria",
  "age" : 22,
  "description" : "Ik hou van sporten, en ik ontwerp kleren in mijn vrije tijd",
  "tags" : ["student", "Bachelor", "HvA"]
},
{
  "firstName": "Kim",
  "lastName": "de Vries",
  "age" : 19,
  "description" : "Ik zoek een leuke vriend",
  "tags" : ["student", "Bachelor", "HvA"]

},
{
  "firstName": "Sophie",
  "lastName": "Jansen",
  "age" : 23,
  "description" : "Ik hou van sporten, en ik ontwerp kleren in mijn vrije tijd",
  "tags" : ["student", "Bachelor", "HvA"]
}
]





app.use(express.static('public'))
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('login', {title:"Pick a user"});
})

app.get('/findmatch', (req, res) => {
  res.render('findmatch', {title:"find it"});
})
app.get('/likelist', (req, res) => {
  res.render('likelist', {title:"My Like list"});
})
app.get('/myprofile', (req, res) => {
  res.render('myprofile', {title:"My profile"});
})


app.use(function (req, res, next){
  res.status(404).send("Sorry can't find that.")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})




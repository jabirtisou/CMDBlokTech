
const express = require('express')
const app = express()
const port = 3000


const users = [{
  "id": 6,
  "firstName": "Anna",
  "lastName": "Alexandria",
  "age" : 22,
  "description" : "Ik hou van sporten, en ik ontwerp kleren in mijn vrije tijd",
},
{
  "id": 5,
  "firstName": "Kim",
  "lastName": "de Vries",
  "age" : 19,
  "description" : "Ik zoek een leuke vriend",
},
{
  "id": 4,
  "firstName": "Sophie",
  "lastName": "Jansen",
  "age" : 23,
  "description" : "Ik hou van sporten, en ik ontwerp kleren in mijn vrije tijd",
},
{
  "id": 3,
  "firstName": "Emerson",
  "lastName": "Mcsweeney",
  "age" : 30,
  "description" : "Ik hou van sporten, en ik ontwerp kleren in mijn vrije tijd",
}
,{
  "id": 2,
  "firstName": "Ruth",
  "lastName": "Williams",
  "age" : 28,
  "description" : "Ik hou van sporten, en ik ontwerp kleren in mijn vrije tijd",
}
,{
  "id": 1,
  "firstName": "Billy",
  "lastName": "Hancock",
  "age" : 26,
  "description" : "Ik hou van sporten, en ik ontwerp kleren in mijn vrije tijd",
}
]





app.use(express.static('public'))
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('login', {title:"Pick a user"});
})

app.get('/findmatch', (req, res) => {
  res.render('findmatch', {title:"find it", users});
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




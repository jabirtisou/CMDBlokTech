const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.static('public'));

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


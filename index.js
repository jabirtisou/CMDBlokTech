const express = require('express')
const app = express()
const port = 3000

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello world !')
})

app.get('/:fullName/:slug', (req, res) => {
  res.send(`<h1>${req.params.fullName}</h1>`)
})

app.use(function (req, res, next){
  res.status(404).send("Sorry can't find that person.")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


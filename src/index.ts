import express from 'express'
import http from 'http'

const app = express()
const server = http.createServer(app)

app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'))

app.set('view engine', 'hbs')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render('index')
})

server.listen(8000, async () => {
  console.log('Serveur démarré sur le port 8000')
})

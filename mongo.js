const mongoose = require('mongoose')
const ConectionString = 'mongodb+srv://christiansosa:38678794@cluster0.7o4vq.mongodb.net/Gastos?retryWrites=true&w=majority'

mongoose.connect(ConectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })
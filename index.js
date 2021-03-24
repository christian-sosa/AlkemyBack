require('dotenv').config()
require('./mongo')
const cors = require('cors')

const express = require('express')
const Transaction = require('./models/Transaction')



const app = express()
app.use(express.json())
app.use(cors())

app.get('/balance', async (request, response) =>{
  var positivo = 0
  var negativo = 0
  const total = await Transaction.find({})
  total.map(trx => (trx.type === 'Entry') ? positivo = trx.amount + positivo : negativo = negativo + trx.amount)
  var total2 = positivo - negativo
  response.json(total2)
})

app.get('/entry', async (request, response) =>{
  const entry = await Transaction.find({type: 'Entry'})
  response.json(entry)
})
app.get('/spending', async (request, response) =>{
  const spending = await Transaction.find({type: 'Spending'})
  response.json(spending)
})

app.get('/total', async (request, response) =>{
  const total = await Transaction.find()
  response.json(total)
})

app.post('/api', async (request, response, next ) => {
  const transaction = request.body

  if (!transaction.type && !transaction.amount) {
    return response.status(400).json({
      error: 'required "content" field is missing'
    })
  }

  const newTransaction = new Transaction({
    type: transaction.type,
    date: new Date(),
    amount: transaction.amount,
    concept: transaction.concept
  })

  try {
    const savedTransaction = await newTransaction.save()
    response.json(savedTransaction)
  } catch (error) {
    next(error)
  }
})

app.delete('/delete/:id', async (request, response) => {
  const { id } = request.params

  const res = await Transaction.findByIdAndDelete(id)
  if (res === null) return response.sendStatus(404)

  response.status(204).end()
})

app.put('/api/modify/:id', (request, response, next) => {
  const { id } = request.params
  const transaction = request.body

  const newTransaction = {
    date: new Date(),
    amount: transaction.amount,
    concept: transaction.concept
  }

  Transaction.findByIdAndUpdate(id, newTransaction, { new: true })
    .then(result => {
      response.json(result)
    })
    .catch(next)
})

const PORT = 3001
app.listen(PORT, () =>{
  console.log('server up')
})
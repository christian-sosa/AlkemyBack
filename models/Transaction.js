const { Schema , model} = require('mongoose')

const transactionSchema = new Schema({
  type: String,
  date: Date,
  amount: Number,
  concept: String
})

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Transaction = model('transaction', transactionSchema)

module.exports = Transaction
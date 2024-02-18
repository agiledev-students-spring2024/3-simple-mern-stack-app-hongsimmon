const mongoose = require('mongoose')
const Schema = mongoose.Schema

const myselfSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
  }
)

// create mongoose Model
const Myself = mongoose.model('Myself', myselfSchema)

// export the model so other modules can import it
module.exports = {
  Myself,
}

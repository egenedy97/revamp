const mongoose = require('mongoose') ; 
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
  username: {
        type: String,
        required: true
      },
      email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error('Email is invalid')
          }
        }
      },
      password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
          if (value.toLowerCase().includes('password')) {
            throw new Error('Password cannot contain "password"')
          }
        }
      },
      mobile :{
          type:String , 
          required:true , 
          length:11
      },
      role:{
        type:String ,
        enum : ['user' , 'service_agent' , 'admin' ],
        default :'user'
      },
      invalidatedTokens: [String],
}
,
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});


userSchema.methods.toJSON = function () {
  const user = this.toObject()
  return {
    ...user,
    password: undefined,
    __v: undefined,
    invalidatedTokens: undefined,
    passwordConfirm: undefined
  }
}


userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'secrretasfasdfas', {
    expiresIn: 86400
  })

  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Unable to login 2')

  }

  return user
}

userSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', userSchema) ; 

module.exports= User ; 

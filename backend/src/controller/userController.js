const User = require('../models/user.model');
const jwt = require('jsonwebtoken');


const register = async(req,res)=>{
    try{
        const data = new User(req.body)
        const proUser = await User.findOne({email:data.email});
        if(proUser)
        {
            throw new Error('user is already register')
        }
        const euser = new User(req.body)
    const enteruser = await euser.save()
    res.status(201).send({ enteruser })
    }catch(e)
    {
        res.status(400).send(e)
    }
}


const login = async(req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log(user) ; 
        const token = await user.generateAuthToken()
        res.send({ user, token })
      } catch (e) {
        res.status(400).send(e)
        console.log(e)
      }
    }


const logout =async(req,res)=>{
    try {
        const authorization = req.header('Authorization')
        let token =authorization.substring(7)

        const decoded = jwt.decode(token)
        const user = await User.findOne({ _id: decoded._id })
    
        if (!user) res.status(400).send('token is corrupted')
    
        const alreadyInvalidated = await User.find({ invalidatedTokens: token })
    
        if (alreadyInvalidated.length === 0) user.invalidatedTokens.push(token)
    
        user.invalidatedTokens = user.invalidatedTokens.filter((token) => {
          const { exp } = jwt.decode(token)
          if (Date.now() >= exp * 1000) return false
          else return true
        })
    
        await user.save()
    
        res.send('You Logged out')
      } catch (e) {
        res.status(500).send({ error: e.message || e.toString() })

      }
}

const updateUser = async(req,res)=>{
    try{
    const id = req.params.id;
    const usr = req.body;
    const userOld = await User.findById(id).exec();
    if(!userOld)
    {
        throw new Error('Can\'t find this user')
    }
    const user = await User.findByIdAndUpdate(id, usr, { new: true }).exec();
    res.status(201).send(user)
    }catch(e)
    {
        res.status(400).send('Can\'t update this user')
    }
}

const deleteUser = async(req,res)=>{
    try{
        const userId = req.params.id ; 
        if(req.user.role === 'admin')
        {
            const user = await User.findById({_id : userId}) ; 
            if(!user)
            {
                throw new Error('can\'t find this user')
            }
            const deletedUser = await user.remove ; 
            res.status(201).send(deletedUser) ; 
        }
       else{
           throw new Error('you can\'t access this user')
       }
    }catch(e)
    {
        res.status(400).send(e)
    }
}

module.exports = {register , login , logout , updateUser , deleteUser} ;

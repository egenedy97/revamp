const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const app = express();
const compression = require('compression');
const db = require('./config/database');
const mongoose = require('mongoose');

const adminRouter = require('./routers/admin.router') ; 
const userRouter = require('./routers/user.router');
const ticketRouter = require('./routers/ticket.router');

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 4200);
app.use(compression());
app.use(cors());

app.use(express.json()) ; 
app.use('/admin' , adminRouter) ; 
app.use('/users' , userRouter) ; 
app.use('/tickets' , ticketRouter) ; 

if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Server Error');
  });
}



const run = async()=>{
   await mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
  
}

module.exports = run ; 
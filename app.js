const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const mongoose = require('mongoose')
const configDB = require('./config/config.json');

// Middleware
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next)=>{
  console.log('Middleware run');
  next();
});

app.get('/', (req, res)=>{
  res.send('Hello World!')
});

app.use('/api', routes);

//connect the app to mongoose
mongoose.connect(configDB.MONGO_URI, { useMongoClient: true }, ()=>{
  console.log('Connected to MongoDB');
})

const port = 3000;
app.listen(port, ()=>{
  console.log(`Server run ${port}`)
});

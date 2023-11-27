const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const redis = require('redis')
const RedisStore = require('connect-redis').default

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_PORT, REDIS_URL, SESSION_SECRET, } = require('./config/config');

const redisClient = redis.createClient({ url: `redis://${REDIS_URL}:${REDIS_PORT}` });
redisClient.connect().catch(console.error);

const patientRouter = require('./routes/patientRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
const connectWithRetry = () => {
  mongoose
  .connect(mongoURL)
  .then(() => console.log("Successfully connected to DB"))
  .catch((e) => {
    console.log(e)
    // Here we wait 5 seconds until we rerun the function
    setTimeout(connectWithRetry, 5000)
  });
};
connectWithRetry();

// in case when we need access to the ip address
app.enable("trust proxy");
app.use(cors({}));

// Middleware for sessions
app.use(session({
  proxy: true,
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 60000 //3600000      // 1 hour in ms
  }
}))
// Setting up our middleware to accept the JSON body we send in the request
app.use(express.json());
app.get('/api/v1', (req, res) => {
  res.send('<h2>SWAG</h2>')
  console.log('yeah it ran');
});
// if there's a request sent from localhost:3000/patients, it will be sent to our patientRouter
// because we're hosting our front- and back-end within the same domain, and to specify the version, we will use /api/v1
app.use('/api/v1/patients', patientRouter);
app.use('/api/v1/users', userRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
import express from 'express';
import cors from 'cors';
import './loadEnvironment.mjs';
import records from './routes/record.mjs';
import logins from './routes/login.mjs';
import signup from './routes/signup.mjs';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const PORT = process.env.PORT || 5050;
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // Update this to your frontend URL
  credentials: true, // This allows cookies to be sent with requests
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
};

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(cors(corsOptions));

app.use(express.json());

// Set up the session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.ATLAS_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      secure: false, // Change this to true for production with HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
    },
  }),
);

app.use('/api/record', records);
app.use('/api/login', logins);
app.use('/api/signup', signup);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

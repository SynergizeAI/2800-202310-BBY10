import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import logins from "./routes/login.mjs";
import signup from "./routes/signup.mjs";
import users from "./routes/user.mjs";
import getUsers from "./routes/getUsers.mjs";
import { connectAbly } from "./ably.mjs";
// import userRoutes from './routes/userRoutes.mjs';
import chatSpaceRoutes from "./routes/chatSpaceRoutes.mjs";
import messageRoutes from "./routes/messageRoutes.mjs";
import ablyAuth from "./routes/ablyAuth.mjs";
import forgotPassword from "./routes/forgotPassword.mjs"; // Import forgotPassword route
import resetPassword from "./routes/resetPassword.mjs"; // Import resetPassword route
import logout from "./routes/logout.mjs"; // Import logout route

import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 5050;
const app = express();


(async () => {
  try {
    console.log("Connecting to Ably...");
    await connectAbly();
    console.log("Connected to Ably!");
  } catch (error) {
    console.error("Failed to connect to Ably:", error);
  }
})();


app.use(cookieParser()); // This line is important!

const corsOptions = {
  origin: "http://localhost:5173", // Update this to your frontend URL
  credentials: true, // This allows cookies to be sent with requests
  methods: ["GET", "POST", "PATCH", "DELETE"],
};

// mongoose.connect(process.env.ATLAS_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.once("open", () => {
//   console.log("MongoDB connection established successfully");
// });

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
      collectionName: "sessions",
    }),
    cookie: {
      secure: false, // Change this to true for production with HTTPS
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
    },
  })
);

app.use("/api/record", records);
app.use("/api/login", logins);
app.use("/api/signup", signup);

app.use("/api/users", users);
app.use("/api/getusers", getUsers);
// app.use('/api/users', userRoutes);
app.use("/api/spaces", chatSpaceRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/ably-auth", ablyAuth);
app.use("/api/forgot-password", forgotPassword); // Add forgotPassword route
app.use("/api/reset-password", resetPassword); // Add resetPassword route
app.use("/api/logout", logout); // Add logout route



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

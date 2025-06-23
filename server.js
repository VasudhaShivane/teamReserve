const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const dotenv = require("dotenv");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const resourceRoutes = require("./routes/resourceRoutes");
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
const app = express();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(expressLayouts);

// EJS + Layouts
app.set("view engine", "ejs");
app.set("layout", "layout");

// Session config
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// 📌 Global locals for views
app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;
  res.locals.isAdmin = req.session.isAdmin || false;
  res.locals.session = req.session;
  res.locals.success = req.session.success || null;
  res.locals.error = req.session.error || null;

  // Clear flash messages after displaying once
  delete req.session.success;
  delete req.session.error;

  next();
});

// Routes
app.use("/", resourceRoutes);
app.use("/", authRoutes);
app.use("/", bookingRoutes);
app.use("/", adminRoutes);

// Connect MongoDB & Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT,'0.0.0.0', () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

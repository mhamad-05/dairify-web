require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');

// Import services
const TestResultService = require('./services/testResultService');
const ResearchDataService = require('./services/researchDataService');
const OrderService = require('./services/orderService');

const app = express();

// Middleware setup
app.use(flash());
app.use(cookieParser());
app.use(session({
    secret: 'dairify-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Request logger (optional)
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.originalUrl}`);
    next();
});

// Import routes and set up page routes
const antibioticRoute = require("./routes/antibioticRoute");
const enzymeRoute = require("./routes/enzymeRoute");
const machineRoute = require("./routes/machineRoute");
const foodSampleRoute = require("./routes/foodSampleRoute");
const userRoutes = require("./routes/userRoute");
const researchDataRoute = require("./routes/researchDataRoute");
const orderRoutes = require('./routes/orderRoutes');
const testResultRoute = require("./routes/testResultRoute");

// Page routes
app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/public/script.js');
});

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/product', (req, res) => {
    res.render('product');
});

app.get('/tour', (req, res) => {
    res.render('tour');
});

app.get('/features', (req, res) => {
    res.render('features');
});

app.get('/dashboard', (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/');
    res.render('dashboard', { user, messages: req.flash() });
});

app.get('/enterprise', (req, res) => {
    res.render('enterprise');
});

app.get('/support', (req, res) => {
    res.render('support');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/pricing', (req, res) => {
    res.render('pricing');
});

app.get('/buy', (req, res) => {
  const user = req.session.user;
  if (!user) {
    req.flash('error', '⚠️ You must be logged in to proceed with purchase.');
    return res.redirect('/login'); // or '/login' if you have a separate login page
  }
  res.render('buy', { user, messages: req.flash() });
});

app.post('/buy', (req, res) => {
    req.flash('success', 'Thank you! Your order has been submitted.');
    res.redirect('/buy');
});

app.get('/food-samples', (req, res) => {
    res.render('food-sample');
});

app.get('/add-antibiotic', (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/');
    res.render('add-antibiotic', { user, messages: req.flash() });
});

app.get('/add-enzyme', (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/');
    res.render('add-enzyme', { user, messages: req.flash() });
});

app.get('/test-results', (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/');
    
    TestResultService.getAllTestResults()
        .then((results) => {
            res.render('test-results', {
                user,
                messages: req.flash(),
                testResults: results || []
            });
        })
        .catch((e) => {
            req.flash('error', e.message || 'Failed to load test results.');
            res.redirect('/dashboard');
        });
});

app.get('/research', (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/');
    
    ResearchDataService.getAllResearchData()
        .then((data) => {
            res.render('research', {
                user,
                messages: req.flash(),
                researchData: data || []
            });
        })
        .catch((e) => {
            req.flash('error', e.message || 'Failed to load research data');
            res.redirect('/dashboard');
        });
});

app.get('/orders', (req, res) => {
    const user = req.session.user;
    if (!user) return res.redirect('/');
    
    OrderService.getAllOrders()
        .then((data) => {
            res.render('orders', {
                user,
                messages: req.flash(),
                orders: data || []
            });
        })
        .catch((e) => {
            req.flash('error', e.message || 'Failed to load orders');
            res.redirect('/dashboard');
        });
});

//here i tried to learn something new and to add a message that appear when the user is logged out
//app.get('/logout', (req, res) => {
  // ✅ Save flash message first
  //req.flash('success', '✅ You have been logged out successfully!');

  // ✅ Get current session data
  //const session = req.session;

  // ✅ Destroy session
  //req.session.destroy((err) => {
    // Redirect to home with the flash message still set
    //res.redirect('/');
  //});
//});


// ⚠️ dr. I put this here to handle any undefined routes and redirect to home
app.get('*', (req, res) => {
    res.redirect('/');
});

// API middleware
app.use(cors());
app.use(bodyParser.json());

// Use API routes
app.use("/api/antibiotics", antibioticRoute);
app.use("/api/enzyme", enzymeRoute);
app.use("/api/machine", machineRoute);
app.use("/api/foodsamples", foodSampleRoute);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/testResult", testResultRoute);
app.use("/api/researchdata", researchDataRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
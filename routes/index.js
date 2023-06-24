const { requiresAuth } = require('express-openid-connect');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
};

const router = require('express').Router();

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// current customer's profile
router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// make a new order
// router.get('/order', requiresAuth(), (req, res) => {
//     // further coding here
//   });

// ADMIN ROUTES:
// database manipulation
router.use('/', requiresAuth(), require('./swagger'));
router.use('/customers', requiresAuth(), require('./customers'));
router.use('/pizzas', requiresAuth(), require('./pizzas'));

// router.use('/', require('./swagger'));
// router.use('/auth', require('./auth'));

module.exports = router;

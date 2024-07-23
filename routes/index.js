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

// database manipulation
router.use('/', requiresAuth(), require('./swagger'));
router.use('/users', requiresAuth(), require('./users'));
router.use('/rigs', requiresAuth(), require('./rigs'));
router.use('/mobos', requiresAuth(), require('./mobos'));
router.use('/cpus', requiresAuth(), require('./cpus'));
router.use('/gpus', requiresAuth(), require('./gpus'));
router.use('/rams', requiresAuth(), require('./rams'));

module.exports = router;

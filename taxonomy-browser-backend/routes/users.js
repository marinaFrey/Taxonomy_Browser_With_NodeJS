const bodyParser = require('body-parser');
var User = require('../models/user');
var express = require('express');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

const userRouter = express.Router();
userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
  .get(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    User.find({})
      .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
      }, (err) => next(err))
      .catch((err) => next(err));
  });

userRouter.route('/:userId')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
  .get(cors.cors, (req, res, next) => {
    /* pega info do usuario, admins ou proprio usuario only (mas nao sei quao util seria isso ainda) */
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    /* desabilitado */
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    /* atualiza infos de um usuario, admins ou proprio usuario only */
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    /* deleta usuario do BD, admins only */
  });

userRouter.route('/:userId/groups')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
  .get(cors.cors, (req, res, next) => {
    /* pega todos os grupos aos quais certo usuario participa, admin ou proprio usuario only */
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    /* adiciona novo grupo a um usuario, admin only */
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    /* altera lista de grupos do usuario?, admin only */
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    /* deleta grupos do usuario no DB, admins only */
  });

userRouter.route('/:userId/groups/:groupId')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
  .get(cors.cors, (req, res, next) => {
    /* pega info de um grupo especifico de um usuario (nao mto util?) */
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    /* desabilitado */
  })
  .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    /* desabilitado */
  })
  .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    /* deleta grupo do usuario no DB, admins only */
  });

userRouter.post('/signup', cors.corsWithOptions, (req, res, next) => {
  User.register(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        if (req.body.firstname) {
          user.firstname = req.body.firstname;
        }
        if (req.body.lastname) {
          user.lastname = req.body.lastname;
        }
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    });
});

userRouter.post('/login', cors.corsWithOptions, passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, status: 'You are successfully logged in!' });
});

userRouter.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

module.exports = userRouter;

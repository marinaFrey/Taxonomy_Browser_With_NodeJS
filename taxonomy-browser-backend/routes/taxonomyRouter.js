const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Taxonomy = require('../models/taxonomy');
const cors = require('./cors');

const taxonomyRouter = express.Router();

taxonomyRouter.use(bodyParser.json());

taxonomyRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {

    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    });

taxonomyRouter.route('/:taxonomyId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {

    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    })

/* SPECIMENS */

taxonomyRouter.route('/:taxonomyId/specimens')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {

    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {

    });

taxonomyRouter.route('/:taxonomyId/specimens/:specimenId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {

    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {

    });

module.exports = dishRouter;
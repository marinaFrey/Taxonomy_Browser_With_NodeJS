const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');
const Taxonomy = require('../models/taxonomy');
const cors = require('./cors');

const groupsRouter = express.Router();

groupsRouter.use(bodyParser.json());

groupsRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {
        /* pega lista com todos os grupos existentes, admin only */
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* cria novo grupo */
        /* habilitado, so para admins */
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* nao habilitado */
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* habilitado, so para admins */
    });

groupsRouter.route('/:groupId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {
        /* pega info de um grupo, admins only */
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* desabilitado */
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* atualiza infos de um grupo, admins only */
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* deleta grupo e o remove de todos os usuarios que pertencem a ele, admins only */
    })

module.exports = groupsRouter;
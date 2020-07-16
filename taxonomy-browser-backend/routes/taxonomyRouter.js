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
        /* pega a arvore taxonomica completa, com os especimes */
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* um post aqui sobrescreveria o nodo root da arvore, entao só deve ser habilitado com a arvore vazia */
        /* habilitado, so para admins */
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* nao habilitado */
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* habilitado, so para admins */
    });

taxonomyRouter.route('/:taxonomyId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {
        /* pega a arvore a partir do nodo com o id enviado, nao parece muito util, talvez nao precise habilitar */
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* adiciona novo nodo taxonomico, admins only */
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* atualiza infos de um nodo taxonomico, admins only */
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* deleta nodo taxonomico e todos os filhos e especimes, admins only */
    })

/* SPECIMENS */

taxonomyRouter.route('/:taxonomyId/specimens')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {
        /* pega lista de especimes de um nodo taxonomico (pegar de todos os filhos tambem?) */
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        /* adiciona um especime a um nodo taxonomico, registered users only */
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        /* desabilitado */
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        /* deleta todos os especimes de um nodo taxonomico, mas acho que nao os de filhos */
    });

taxonomyRouter.route('/:taxonomyId/specimens/:specimenId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
    .get(cors.cors, (req, res, next) => {
        /* pega especime a partir de seu ID de um novo taxonomico especifico */
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        /* desabilitado */
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        /* atualiza infos do especime, podendo adicionar novas medidas a ele */
        /* admin only, ou usuario que o criou */
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        /* deleta especime */
        /* admin only, ou usuario que o criou */
    });

module.exports = taxonomyRouter;
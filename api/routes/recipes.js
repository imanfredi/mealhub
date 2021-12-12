const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');




router.get('/', (req, res) => {
    
    res.send()
    //GET all recipes
});

router.get('/:id', (req, res) => {
    //GET recipe with id
});

router.post('/', (req, res) => {
    //POST recipe
});

router.patch('/:id', (req, res) => {
    //UPDATE recipe
});

router.delete('/:id', (req, res) => {
    //DELETE recipe
});

module.exports = router;
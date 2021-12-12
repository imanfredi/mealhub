const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

let searchService;
await require('../services/searchService').then((service) => searchService = service);

router.get('/', (req, res) => {
    
    let page = req.query.page || 0;
    let pageSize = req.query.pageSize || 16;

    let results = searchService.getRecipes(page,pageSize);
    
    if(results == null){
        return res.send() //FIXME: BAD REQUEST
    }

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
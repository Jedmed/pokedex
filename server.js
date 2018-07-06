const express = require('express');
const app = express();
const pokemon = require('./models/pokemon.js');
const methodOverride = require('method-override');


// Port
const port = process.env.PORT || 3000;

// Middleware Body Parser
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: false
}));

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Pokemon App!');
});

// Get Index Route
app.get('/pokedex', (req, res) => {
  res.render('index.ejs', {
    page: req.url,
    pokemon: pokemon,
    pokemonId: '',
    pokemonStats: ''
  });
});

// Create Route
app.post('/pokedex', (req, res) => {
  const stats = {
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
    spattack: req.body.spattack,
    spdefense: req.body.spdefense,
    speed: req.body.speed
  };
  req.body.stats = stats;
  pokemon.push(req.body);
  res.redirect('/pokedex');
})

// New Route
app.get('/pokedex/new', (req, res) => {
  res.render('index.ejs', {
    page: req.url,
    pokemon: pokemon,
    pokemonId: pokemon[req.params.index]
  });
});

// Show Route
app.get('/pokedex/:index', (req, res) => {
  res.render('index.ejs', {
    page: req.url,
    pokemon: pokemon,
    pokemonId: pokemon[req.params.index],
    pokemonStats: pokemon[req.params.index].stats
  });
});

// Edit Route
app.get('/pokedex/:index/edit', (req, res) => {
  res.render('index.ejs', {
    page: req.url,
    pokemon: pokemon,
    pokemonId: pokemon[req.params.index],
    pokemonStats: pokemon[req.params.index].stats,
    index: req.params.index
  });
})

// Update Route
app.put('/pokedex/:index', (req, res) => {
  for (let change in req.body) {
    const stats = {
      hp: req.body.hp,
      attack: req.body.attack,
      defense: req.body.defense,
      spattack: req.body.spattack,
      spdefense: req.body.spdefense,
      speed: req.body.speed
    };
    pokemon[req.params.index].stats = stats
    pokemon[req.params.index][change] = req.body[change];
  }
  res.redirect('/pokedex/' + req.params.index);
});

// Delete Route
app.delete('/pokedex/:index', (req, res) => {
  pokemon.splice(req.params.index, 1);
  res.redirect('/pokedex');
});

// Port Listener
app.listen(port);

const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/beers', async (req, res) => {
  try {
    const response = await punkAPI.getBeers()
    const data = response.slice(0, 25)
    console.log(data)

    res.render('beers', {data});
  }
  catch(error) {
    console.log(error)
  }
});

app.get('/beers', async (req, res) => {
  try {
    const response = await punkAPI.getBeers()
    const data = response.slice(0, 25)
    console.log(data)

    res.render('beers', {data});
  }
  catch(error) {
    console.log(error)
  }
});

app.get('/beers/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await punkAPI.getBeer(id)
    const dataBeerDetail = response[0]
    console.log(dataBeerDetail )

    res.render('beer-detail', {dataBeerDetail});
  }
  catch(error) {
    console.log(error)
  }
});

app.get('/random-beer', async (req, res) => {
  try {
    const response = await punkAPI.getRandom()
    const dataBeerRandom = response[0]
    console.log("random", dataBeerRandom)

    res.render('random-beer', {dataBeerRandom});
  }
  catch(error) {
    console.log(error)
  }
});

/* Version 2:
app.get('/random-beer', async (req, res) => {
  try {
    const dataBeerRandom = await punkAPI.getRandom()
    console.log("random", dataBeerRandom)

    res.render('random-beer', {dataBeerRandom});
  }
  catch(error) {
    console.log(error)
  }
}); */

app.listen(3000, () => console.log('🏃‍ on port 3000'));

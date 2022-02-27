const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// route setting, index
app.get('/', (req, res) => {
  res.render('index', { restaurants : restaurantList.results})
})

// route setting, search-bar
app.get('/search', (req, res) => {
  const searchKeyword = req.query.Keyword
  const restaurantSearched = restaurantList.results.filter((restaurant) => {
    return restaurant.name.toLowerCase().includes(searchKeyword.toLocaleLowerCase())
  })

  res.render('index', { restaurants : restaurantSearched, searchKeyword})
})


// route setting, show
app.get('/restaurants/:restaurant_id', (req, res) => {
  const targetSelected = restaurantList.results.find((restaurant) => {
      return restaurant.id.toString() === req.params.restaurant_id
  })
  res.render('show', { restaurant: targetSelected })
})



// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// setting static files
app.use(express.static('public'))

// listen to server
app.listen(port, () => {
  console.log(`Express is running smoothly on http://localhost:${port}`)
})


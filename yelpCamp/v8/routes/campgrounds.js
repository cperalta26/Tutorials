const router = require('express').Router()
const Campground = require('../models/campground')

//INDEX - show all campgrounds
router.get('/', (req, res, next) => {
  //Get all campground from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(`This is the error: ${err}`)
    } else {
      res.render('campgrounds/index', {allCampgrounds})
    }
  })
})

//CREATE - add new campground to DB
router.post('/', isLoggedIn, (req, res, next) => {
  const {name} = req.body
  const {image} = req.body
  const {description} = req.body
  const author = {
    id: req.user._id,
    username: req.user.username
  }
  const newCampground = {name, image, description, author}

  //Create a new campground and save it to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(`This is the error: ${err}`)
    } else {
      console.log(`Campground was created: ${newlyCreated}`)
      res.redirect('/campgrounds')
    }
  })
})

//NEW - show form to create new campground
router.get('/new', isLoggedIn, (req, res, next) => {
  res.render('campgrounds/new')
})

//SHOW - shows more info about one campground
router.get('/:id', (req, res, next) => {
  //find the campground with provided ID
  const campId = req.params.id
  Campground.findById(campId).populate('comments').exec( (err, foundCampground) => {
    if (err) {
      console.log(`This is the error ${err}`)
    } else {
      //render show template with that campground
      res.render('campgrounds/show', {foundCampground})
    }
  })
})

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

module.exports = router

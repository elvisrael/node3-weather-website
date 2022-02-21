const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()
//define application port
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(publicDirectoryPath))

//Setup Get
app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'EvgenyL'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About',
        source: '/img/me.png',
        name: 'EvgenyL'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help page',
        source: '/img/1.jpg',
        helpText: 'This is some help text',
        name: 'EvgenyL'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404',
        pageAddress: req.path,
        name: 'Evgenyl'

    })
})
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address){
        return res.send({
            error: 'You must provide address'
        });
    }
    geocode(address, (err, {longitude, latitude, location} = {}) => {
        if(err){
            return res.send(err);
        }
        forecast(longitude, latitude, (error, forecastData = {}) => {
            if(error){
                return res.send({error:error});
            }
            res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
  
})
app.get('*', (req,res)=>{
    res.render('404',{
        title: '404',
        pageAddress: req.path,
        name: 'EvgenyL'
    })
})



app.listen(port, () => {
    console.log('Server is up and listening to port ' + port);
})
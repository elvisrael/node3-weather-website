const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d57b9f21bf5f0256e121706723d7a9c4&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect to site', undefined);
        }else if(isNaN(longitude) || isNaN(latitude)){
            callback('The coordinats is wrong!', undefined)
        }else if(body.error){
            callback(body.error)
        }else{
            callback(undefined,
                body.current.weather_descriptions +' The temperature: '+ body.current.temperature + '. Feels like: ' + body.current.feelslike
            )
        }
    })
}

module.exports = forecast
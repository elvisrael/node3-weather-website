const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZWx2aXNyYWVsIiwiYSI6ImNrenBkMWppMDNmcXgyb28wb3p4bWFycm8ifQ.2wyVgkgrCqX9BjaQZzaucw'
    request({ url, json: true}, (error, { body} = {}) => {
        if(error){
            callback({error:'Unable to connect to location service'}, undefined);
        }else if(body.features.length == 0){
            callback({error:'Location not found. Try another search'}, undefined)
        }else{
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode

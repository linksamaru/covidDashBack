module.exports = {
    covid:{
        getAllCountries:{
            path:'/v1/stats',
            action:'get'
        },
        getByCountry:{
            path:'/v1/stats',
            action:'get',
            filters:['country'],
        },
        base:'https://covid19-api.weedmark.systems/api'
    },
    chuck:{
        getFact:{
            path:'/jokes/random',
            action:'get'
        },
        base:'https://api.chucknorris.io'
    },
    numbers:{
        getFact:{
            path:'/random/trivia',
            action:'get'
        },
        base:'http://numbersapi.com'
    },
    geoIP:{
        getInfo:{
            path:'/:ip/json/',
            action:'get'
        },
        base:'https://ipapi.co'
    },
};

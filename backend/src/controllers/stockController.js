const axios = require('axios')
const Stock = require('../models/Stock')

module.exports = {
    async index(req, res){
        const  name  = req.params.stock
        if(!name) return res.status(401).send()

        console.log(name)
        var price = 0
        var priceAt = '00-00-00'

        await axios.get('https://www.alphavantage.co/query', {
            params: {
                apikey: 'VV42OKJYPYCI2268.',
                function: 'TIME_SERIES_DAILY',
                symbol: name,
                interval:'60min'
            }
        }).then(r => {
            var prices = new Array()
            var pricesAt = new Array()
            if(!r.data['Time Series (Daily)']) {
                console.log(r.data)
                return res.status(400).send()
            }
            for(k in r.data['Time Series (Daily)']){
                pricesAt.push(k)
                prices.push(r.data['Time Series (Daily)'][k.toString()])
            }
            price = prices[0]['1. open']
            priceAt = pricesAt[0]
        }).catch(e => {
            console.log(e)
            return res.status(500)
        })


        return res.json({
            name,
            price,
            priceAt
        })
    }
}
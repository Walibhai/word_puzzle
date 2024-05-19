require('dotenv').config()
const PORT = process.env.port || 8000
const axios = require("axios").default
const express = require("express")
const cors = require("cors")
const path=require('path');
const exp = require('constants')
const app = express()


app.use(cors())

app.get('/word', (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
        params: {count: '5', wordLength: '5'},
        headers: {
            'X-RapidAPI-Host': 'random-words5.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY
        }
    }
    axios.request(options).then((response) => {
         console.log(response.data)
        res.json(response.data[0])
    }).catch((error) => {
        console.error(error)
    })
})


app.get('/check', (req, res) => {
    const word = req.query.word

    const options = {
        method: 'GET',
        url: 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary',
        params: { word: `${word}` },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com',
          },
    };
    axios.request(options)
    .then((response) => {
        // console.log(response.data)
        res.json(response.data.valid)
    }).catch((error) => {
        console.error(error)
    })
})

/*
// server static file
app.use(express.static(path.join(__dirname,'/frontend/build')))

//after defining routes any that doesn't match what's above,send back index.html
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname+'/frontend/build/index.html'))
})
*/
app.listen(PORT, () => console.log(`Server running on port  ${PORT}`))

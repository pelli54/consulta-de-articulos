const parser = require('simple-excel-to-json')
const express = require('express')
const cors = require('cors')

const app = express()

let doc = parser.parseXls2Json('./lista.xlsx')

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.get('/ping1/:texto', (req,res) => {
    console.log(req.params)
    res.json({
        'message': 'hello'
    })
})

app.get('/search/:text', (req, res) => {
    let text = req.params.text.trim()
    console.log(text)
    let data = doc[0].filter(a => {
        let cod = String(a.codigo)
        if(a.nombre.includes(text.toLocaleUpperCase()) || cod.includes(text.toLocaleUpperCase())){
            return true
        }
    })
    res.json(data)
})


app.listen(2121, () => console.log("server on port 2121"))
const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())

const morgan = require('morgan')
morgan.token('body', (req, res) => {
    if (req.method === 'POST')
        return JSON.stringify(req.body)
})
app.use(express.json())
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.body(req, res)
    ].join(' ')
}))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const getinfo = () => {
    const currentDate = new Date()
    const phonebookInfo = `Phonebook has info for ${persons.length} people<br>${currentDate}`
    return phonebookInfo
}
app.get('/info', (req, res) => {
    res.send(getinfo())
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)

    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }

})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {

    if (!req.body.name) {
        return res.status(400).json({
            error: 'name missing'
        })
    }
    else if (!req.body.number) {
        return res.status(400).json({
            error: 'number missing'
        })
    }
    else if (persons.find(p => p.name === req.body.name)) {
        return res.status(409).json({ error: 'name must be unique' })
    }

    const id = Math.floor(Math.random() * 1000)
    let person = { ...req.body }
    person.id = id
    persons = persons.concat(person)
    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

})
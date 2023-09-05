require('dotenv').config()
const express = require('express')
const app = express()

const Person = require('./models/person')
const cors = require('cors')
app.use(cors())

app.use(express.static('dist'))

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

// let persons = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     }
// ]

const getInfo = (size) => {
    const currentDate = new Date()
    const phonebookInfo = `Phonebook has info for ${size} people<br>${currentDate}`
    return phonebookInfo
}
app.get('/info', (req, res) => {
    Person.find({}).then(persons => {

        res.json(getInfo(persons.length))
    })
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        const allPersons = [...persons]
        res.json(allPersons)
    })

})

app.get('/api/persons/:id', (req, res, next) => {
    console.log(req.params.id)
    Person.findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(person)
            } else {
                res.status(404).end()
            }
        })
        .catch(error => next(error))

})

app.delete('/api/persons/:id', (req, res, next) => {

    Person.findByIdAndRemove(req.params.id).then(result => {
        res.status(204).end()
    })
        .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {

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


    const body = { ...req.body }

    const person = new Person({ name: body.name, number: body.number })
    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
        .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = { name: body.name, number: body.number }

    Person
        .findByIdAndUpdate(req.params.id, person, { new: true, runValidators: true, context: 'query' })
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)

})
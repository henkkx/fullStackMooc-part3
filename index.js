const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const generateID = () => Math.floor(Math.random() * 10000);

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '1234567890'
    },
    {
        id: 2,
        name: 'Henrik Hiltunen',
        number: '1029384756'
    },
    {
        id: 3,
        name: 'abcdefg',
        number: '00000000'
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(p => p.id === Number(req.params.id))
    person ? res.json(person) : res.status(404).end()

})

app.get('/info', (req, res) => {
    const date = new Date()
    const content = `
		
		<p>The phonebook contains ${persons.length} people.</p>
		
		<p>${date}</p>
	`
    res.send(content)
})

app.delete('/api/persons/:id', (req, res) => {
    persons.filter(p => p.id !== Number(req.params.id))
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return res.status(400).json({
            error: 'name is missing'
        })
    } else if (!body.number) {
        return res.status(400).json({
            error: 'number is missing'
        })
    } else if (persons.find(p => p.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID()
    }

    persons.concat(person)
    res.json(person)

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


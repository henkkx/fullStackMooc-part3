const express = require('express')
const app = express()

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

app.get('/info', (request, response) => {
	const date = new Date()
	const content = `
		
		<p>The phonebook contains ${persons.length} people.</p>
		
		<p>${date}</p>
	`
	response.send(content)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})


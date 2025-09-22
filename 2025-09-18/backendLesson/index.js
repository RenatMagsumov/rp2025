const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// in-memory storage
let items = [{ id: 1, name: 'First item' }]
let nextId = 2

// CREATE
app.post('/api/items', async (req, res) => {
    const { name } = req.body || {}
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'name is required' })
    }
    const item = { id: nextId++, name }
    items.push(item)
    res.status(201).json(item)
})

// READ all
app.get('/api/items', async (req, res) => {
    res.json(items)
})

// READ one
app.get('/api/items/:id', async (req, res) => {
    const id = Number(req.params.id)
    const found = items.find((i) => i.id === id)
    if (!found) return res.status(404).json({ error: 'Not found' })
    res.json(found)
})

// UPDATE
app.put('/api/items/:id', async (req, res) => {
    const id = Number(req.params.id)
    const idx = items.findIndex((i) => i.id === id)
    if (idx === -1) return res.status(404).json({ error: 'Not found' })

    const { name } = req.body || {}
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: 'name is required' })
    }

    items[idx] = { ...items[idx], name }
    res.json(items[idx])
})

// DELETE
app.delete('/api/items/:id', async (req, res) => {
    const id = Number(req.params.id)
    const before = items.length
    items = items.filter((i) => i.id !== id)
    if (items.length === before) return res.status(404).json({ error: 'Not found' })
    res.status(204).send()
})

// Route params demo
app.get('/users/:userId/books/:bookId', async (req, res) => {
    const { userId, bookId } = req.params
    res.json({ userId, bookId, note: 'Route params demo' })
})

app.get('/flights/:from-:to', async (req, res) => {
    const { from, to } = req.params
    res.json({ from, to, note: 'Flight route demo' })
})

app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`)
})

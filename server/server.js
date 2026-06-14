import express from 'express'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const dataDir = join(__dirname, 'data')

// Load the data once at startup.
const projects = JSON.parse(readFileSync(join(dataDir, 'projects.json'), 'utf-8'))
const personal = JSON.parse(readFileSync(join(dataDir, 'personal.json'), 'utf-8'))

const app = express()
const PORT = process.env.PORT || 3001

// All school projects.
app.get('/api/projects', (req, res) => {
  res.json(projects)
})

// A single project by id.
app.get('/api/projects/:id', (req, res) => {
  const project = projects.find((p) => p.id === req.params.id)
  if (!project) {
    return res.status(404).json({ error: `Project '${req.params.id}' not found` })
  }
  res.json(project)
})

// All personal works.
app.get('/api/personal', (req, res) => {
  res.json(personal)
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})

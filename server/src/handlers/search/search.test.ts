// Generated with tools/generate.js
import express from 'express'
import request from 'supertest'
import users from './search.handler'

const app = express()
app.use('/', users)

describe('GET /search', () => {
  test('Success', async () => {
    const result = await request(app).get('/search')
    expect(result.body.success).toEqual(true)
    expect(result.status).toEqual(200)
  })
})

const request = require('supertest')
const server = require('./server')

describe("server", () => {
    describe("environment", () => {
      test("should set environment to testing", () => {
        expect(process.env.DB_ENV).toBe("testing")
      })
    })
})

test("returns html", () => {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.type).toMatch(/html/i)
    })
  })
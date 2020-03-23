const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const users = require("./auth-model");

describe("auth-router.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("/register", () => {
    test("should return a 404 status", () => {
      return request(server)
        .post("/register")
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe("/login", () => {
    test("should return a 404 status", () => {
      return request(server)
        .post("/login")
        .then(res => {
          expect(res.status).toBe(404);
        });
    });
  });

  describe("/register", () => {
    test("user created", async () => {
      await request(server)
        .post("/api/auth/register")
        .send({ username: "buzz", password: "password" })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  });
// cant get login to pass for some reason
// says theres an error on .toBe()
//looks right to me
  describe("/login", () => {
    test("user logged in", async () => {
      await request(server)
        .post("/api/auth/login")
        .send({ username: "mr potatoe head", password: "toystory" })
        .then(res => {
          expect(res.status).toBe(200)
        });
    });
  });
});
import request from "supertest";
import { app } from "../../app";

it("fails when unexisting email is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "unknown@user.com",
      password: "password",
    })
    .expect(400);
});
it("fails when incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@user.com",
      password: "password",
    })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@user.com",
      password: "WRONG-Password",
    })
    .expect(400);
});
it("respodns with a coockie when a valid creds are supplied ", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@user.com",
      password: "password",
    })
    .expect(201);
  const respons = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@user.com",
      password: "password",
    })
    .expect(200);
  expect(respons.get("Set-Cookie")).toBeDefined();
});

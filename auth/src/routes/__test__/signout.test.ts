import request from "supertest";
import { app } from "../../app";

it("clears the coockie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@user.com",
      password: "password",
    })
    .expect(201);
  const respons = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);
  expect(respons.get("Set-Cookie")[0]).toBe(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});

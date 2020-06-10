import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("return a 404 if the ticket is NOT found", async () => {
  const notExistingId = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${notExistingId}`)
    .set("Cookie", global.signin())
    .send()
    .expect(404);
});
it("return the ticket if the ticket is found", async () => {
  const title = "show random title";
  const price = 10;
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});

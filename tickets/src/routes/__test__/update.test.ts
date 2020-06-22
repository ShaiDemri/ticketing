import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";
import { Ticket } from "../../models/ticket";

it("updates the title correctly", async () => {
  const cookie = global.signin();
  const title = `ticket to update`;
  const updatedTitle = `updated ticket`;
  const price = 5;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);
  const ticketId = response.body.id;

  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(ticketResponse.body.title).toEqual(title);

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send({ title: updatedTitle, price })
    .expect(200);
  const updatedTicket = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(updatedTicket.body.title).toEqual(updatedTitle);
});
it("updates the price correctly", async () => {
  const cookie = global.signin();
  const title = `ticket to update`;
  const price = 5;
  const updatedPrice = 10;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);
  const ticketId = response.body.id;

  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(ticketResponse.body.price).toEqual(price);

  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send({ title, price: updatedPrice })
    .expect(200);

  const updatedTicket = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(updatedTicket.body.price).toEqual(updatedPrice);
});

it("return a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "title", price: 20 })
    .expect(404);
});
it("return a 401 if the user is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "title", price: 20 })
    .expect(401);
});
it("return a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", global.signin())
    .send({ title: "title", price: 10 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "new title", price: 20 })
    .expect(401);
});

it("return 400 if the user provides an invalid title ", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", cookie)
    .send({ title: "title", price: 10 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);
});
it("return 400 if the user provides an invalid price", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post(`/api/tickets/`)
    .set("Cookie", cookie)
    .send({ title: "title", price: 10 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "title", price: -20 })
    .expect(400);
});
it("publish an event upon update", async () => {
  const cookie = global.signin();
  const title = `ticket to update`;
  const updatedTitle = `updated ticket`;
  const price = 5;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);
  const ticketId = response.body.id;

  jest.clearAllMocks();
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send({ title: updatedTitle, price })
    .expect(200);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it("rejects updates if the ticket is reserved", async () => {
  const cookie = global.signin();
  const title = `ticket to update`;
  const updatedTitle = `updated ticket`;
  const price = 5;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title, price })
    .expect(201);
  const ticketId = response.body.id;
  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = await Ticket.findById(ticketId);
  ticket!.set({ orderId });
  await ticket!.save();

  jest.clearAllMocks();
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set("Cookie", cookie)
    .send({ title: updatedTitle, price })
    .expect(400);
});

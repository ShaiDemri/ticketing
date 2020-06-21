import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";
import { OrderStatus } from "@demris/common";
import { Order } from "../../models/orders";
import { natsWrapper } from "../../nats-wrapper";

const buildTicket = async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 10,
  });
  await ticket.save();

  return ticket;
};

it("delete the order", async () => {
  const ticket = await buildTicket();
  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  const deletedOrder = await Order.findById(order.id);
  expect(deletedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("throws an error if one user tries to delete another user orders ", async () => {
  const ticket = await buildTicket();
  const user = global.signin();
  const otherUser = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  const { body: fetchedOrder } = await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", otherUser)
    .send()
    .expect(401);

  expect(fetchedOrder.id).toEqual(undefined);
});

it("emits an order delete event", async () => {
  const ticket = await buildTicket();
  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({
      ticketId: ticket.id,
    })
    .expect(201);

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(204);

  expect(natsWrapper.client.publish).toHaveBeenCalled();
});

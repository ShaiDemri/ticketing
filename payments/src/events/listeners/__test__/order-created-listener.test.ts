import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { OrderCreatedEvent, OrderStatus } from "@demris/common";
import { OrderCreatedListener } from "../order-created-listener";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";

const setup = () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  
  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    userId: "asdf",
    expiresAt: "asdf",
    version: 0,
    ticket: {
      id: "asdf",
      price: 10,
    },
  };

  //@ts-ignore
  const msg: Message = { ack: jest.fn() };

  return { listener, data, msg };
};

it("persist the order data from the event", async () => {
  const { listener, data, msg } = setup();
  await listener.onMessage(data, msg);
  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(10);
});

it("acks the msg", async () => {
  const { listener, data, msg } = setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

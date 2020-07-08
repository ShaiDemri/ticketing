import { Message } from "node-nats-streaming";
import {
  PaymentCreatedEvent,
  Subjects,
  OrderStatus,
  Listener,
} from "@demris/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/orders";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;
  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const orderId = data;
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error("not found");
    }
    order.set({ status: OrderStatus.Complete });
    await order.save();

    msg.ack();
  }
}

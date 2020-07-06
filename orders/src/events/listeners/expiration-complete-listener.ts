import { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@demris/common";
import { queueGroupName } from "./queue-group-name";
import { Order } from "../../models/orders";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<
  ExpirationCompleteEvent
> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  queueGroupName: string = queueGroupName;

  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    const { orderId } = data;

    const order = await Order.findById(orderId).populate("ticket");
    if (!order) {
      throw new Error("order not found");
    }
    if (order.status === OrderStatus.Complete) {
      return msg.ack();
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: { id: order.ticket.id },
    });

    msg.ack();
  }
}

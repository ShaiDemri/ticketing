import { Message } from "node-nats-streaming";
import {
  Listener,
  OrderCancelledEvent,
  Subjects,
  NotFoundError,
} from "@demris/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    const { ticket } = data;
    const cancelledTicket = await Ticket.findById(ticket.id);

    if (!cancelledTicket) {
      throw new NotFoundError();
    }
    cancelledTicket.set({ orderId: undefined });
    await cancelledTicket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: cancelledTicket.id,
      title: cancelledTicket.title,
      price: cancelledTicket.price,
      userId: cancelledTicket.userId,
      orderId: cancelledTicket.orderId,
      version: cancelledTicket.version,
    });

    msg.ack();
  }
}

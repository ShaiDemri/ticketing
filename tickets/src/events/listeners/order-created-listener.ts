import { Message } from "node-nats-streaming";
import {
  Listener,
  OrderCreatedEvent,
  Subjects,
  NotFoundError,
} from "@demris/common";
import { queueGroupName } from "./queue-group-name";
import { Ticket } from "../../models/ticket";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const { ticket } = data;
    const reservedTicket = await Ticket.findById(ticket.id);

    if (!reservedTicket) {
      throw new NotFoundError();
    }

    reservedTicket.set({ orderId: data.id });
    await reservedTicket.save();

    await new TicketUpdatedPublisher(this.client).publish({
      id: reservedTicket.id,
      title: reservedTicket.title,
      price: reservedTicket.price,
      userId: reservedTicket.userId,
      orderId: reservedTicket.orderId,
      version: reservedTicket.version,
    });

    msg.ack();
  }
}

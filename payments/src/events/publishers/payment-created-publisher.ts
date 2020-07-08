import { Subjects, Publisher, PaymentCreatedEvent } from "@demris/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  
}

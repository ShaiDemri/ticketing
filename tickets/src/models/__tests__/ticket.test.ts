import { Ticket } from "../ticket";
import { TicketCreatedPublisher } from "../../events/publishers/ticket-created-publisher";

it("implements optimistic concurrency control", async (done) => {
  //create a ticket and save it to DB
  const ticket = Ticket.build({ title: "concert", price: 5, userId: "123" });
  await ticket.save();

  // fetch the SAME ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  //update the the 2 instances separatly
  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  // save the first instace, this is expected to succeed
  await firstInstance!.save();

  // save the second instace, this is expected to fail
  try {
    await secondInstance!.save();
  } catch (error) {
    return done();
  }
  throw new Error("TEST FAILED! Should not reach this point");
});

it("increments the version number on multiple saves", async () => {
  const ticket = Ticket.build({ title: "concert", price: 1, userId: "1234" });
  await ticket.save();

  expect(ticket.version).toEqual(0);
  await ticket.save();
  expect(ticket.version).toEqual(1);
  await ticket.save();
  expect(ticket.version).toEqual(2);
  await ticket.save();
  expect(ticket.version).toEqual(3);
});

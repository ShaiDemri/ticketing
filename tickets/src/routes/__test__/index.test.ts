import request from "supertest";
import { app } from "../../app";

it("can fetch all tickets", async () => {
  const numOfTickets = 5;
  for (let i = 0; i < numOfTickets; i++) {
    const title = `random title-${i}`;
    const price = i * 10 + 1;
    await request(app)
      .post("/api/tickets")
      .set("Cookie", global.signin())
      .send({ title, price })
      .expect(201);
  }
  const response = await request(app).get("/api/tickets").send().expect(200);
  expect(response.body.length).toEqual(numOfTickets);
});

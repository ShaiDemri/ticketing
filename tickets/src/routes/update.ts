import express, { Request, Response } from "express";
import { param, body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from "@demris/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    param("id").notEmpty().withMessage("Ticket id is required"),
    body("title").notEmpty().withMessage("Title is required"),
    body("price").isFloat({ gt: 0 }).withMessage("price must be >0"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }
    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    const title = req.body.title;
    const price = req.body.price;
    ticket.set({ title: title, price: price });
    await ticket.save();

    res.status(200).send(ticket);
  }
);

export { router as updateTicketsRouter };

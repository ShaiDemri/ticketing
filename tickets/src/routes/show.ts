import express, { Request, Response } from "express";
import { param } from "express-validator";
import { requireAuth, validateRequest, NotFoundError } from "@demris/common";
import { Ticket } from "../models/ticket";
const router = express.Router();

router.get(
  "/api/tickets/:id",
  requireAuth,
  [param("id").notEmpty().withMessage("id is required")],
  validateRequest,
  async (req: Request, res: Response) => {
    const id = req.params.id;

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }
    res.status(200).send(ticket);
  }
);

export { router as showTicketsRouter };

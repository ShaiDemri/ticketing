import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from "@demris/common";
import { Order } from "../models/order";
import { Payment } from "../models/payment";
import { stripe } from "../stripe";
import { natsWrapper } from "../nats-wrapper";
import { PaymentCreatedPublisher } from "../events/publishers/payment-created-publisher";

const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [
    body("token").notEmpty().withMessage("You Must Provide a Token"),
    body("orderId").notEmpty().withMessage("You Must Provide an orderId"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // @param token is stripe's token
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError(); //404
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError(); //401
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("cannot pay for cancelled orders"); //400
    }

    const charge = await stripe.charges.create({
      amount: order.price * 100,
      currency: "usd",
      source: token,
      description: "order test purchased",
    });

    const payment = Payment.build({
      orderId: orderId,
      stripeId: charge.id,
    });
    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ id: payment.id });
  }
);

export { router as createChargeRouter };

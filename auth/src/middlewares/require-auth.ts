import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
/**
 *
 * @param req
 * @param res
 * @param next
 *
 * Must be called after ./middlewares/current-user.ts
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  next();
};

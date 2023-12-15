import { Request, Response, NextFunction } from 'express';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode ?? 500;

  res.status(statusCode).send({
    message: err.message,
    success: false,
  });
};

export default errorHandler;

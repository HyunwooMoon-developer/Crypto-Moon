import { Response } from 'express';

const sendError = (res: Response, err: any) => {
  res.status(500).send({
    message: err.mesasge,
    success: false,
  });
};

export default sendError;

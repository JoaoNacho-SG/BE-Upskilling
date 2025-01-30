import { Request, Response, NextFunction } from "express";

export const loggerFn = (req: Request, res: Response, nextFn: NextFunction) => {
  console.log("URL: ", req.url);
  console.log("Query: ", JSON.stringify(req.query));
  console.log("Method: ", req.method);
  console.log("Body: ", JSON.stringify(req.body));
  console.log("Status Code: ", res.statusCode);
  nextFn();
};

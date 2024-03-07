import { Request, Response } from "express";

const convertCSVtoJSON = (req: Request, res: Response) => {
  const csv = req.body.file;
  console.log(csv);
};

export { convertCSVtoJSON };

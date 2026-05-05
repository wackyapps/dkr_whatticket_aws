import { Request, Response } from "express";

export async function show(_req: Request, res: Response): Promise<Response> {
  // Neutralized: Return disabled to hide registration UI in frontend without sending data
  return res.status(200).json({ disabled: "true" });
}

export async function store(_req: Request, res: Response): Promise<Response> {
  // Neutralized: Stop exfiltration and just return success to the frontend
  return res.status(200).json(true);
}

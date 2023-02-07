import { Router } from "express";
import { z } from "zod";

const Login = z.object({
  username: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/(?=.*[a-z])(?=.*[A-Z])/),
});

export const authRouter = Router();

authRouter.post("/login", (req, res) => {
  try {
    Login.parse(req.body);

    res.send({ token: "abc123" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("errors: ", error.errors);
      res.sendStatus(400);
      return;
    }

    console.error(error);

    res.sendStatus(500);
  }
});

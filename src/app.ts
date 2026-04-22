import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

// Health check (Render uses this sometimes)
app.get("/api/healthz", (_req: Request, res: Response) => {
  res.status(200).send("OK");
});

// Basic homepage route
app.get("/", (_req: Request, res: Response) => {
  res.send("HWP Bot is running");
});

// Only start server if PORT exists (Render-safe)
const port = process.env.PORT;

if (port) {
  app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
  });
}

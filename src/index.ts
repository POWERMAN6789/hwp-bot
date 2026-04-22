import app from "./app.js";
import { startBot } from "./bot/index.js";

const port = Number(process.env.PORT) || 8080;

// Start web server FIRST (important for Render)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Then start bot
startBot().catch((err) => {
  console.error("Bot failed to start:", err);
});

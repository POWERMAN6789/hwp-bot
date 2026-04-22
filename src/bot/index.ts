import {
  Client,
  GatewayIntentBits,
  ChatInputCommandInteraction,
  REST,
  Routes,
} from "discord.js";

import { commands, commandDataArray } from "./commands/index.js";
import { logger } from "../lib/logger.js";

async function registerCommands(token: string, clientId: string) {
  const rest = new REST({ version: "10" }).setToken(token);

  try {
    logger.info("Registering slash commands...");

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commandDataArray }
    );

    logger.info(`Registered ${commandDataArray.length} commands`);
  } catch (err) {
    logger.warn("Failed to register slash commands", { err });
  }
}

export async function startBot() {
  const token = process.env.DISCORD_BOT_TOKEN;
  const clientId = process.env.DISCORD_CLIENT_ID;

  if (!token || !clientId) {
    throw new Error("Missing DISCORD_BOT_TOKEN or DISCORD_CLIENT_ID");
  }

  await registerCommands(token, clientId);

  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.once("ready", () => {
    logger.info(`Bot online as ${client.user?.tag}`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const cmdInteraction = interaction as ChatInputCommandInteraction;
    const command = commands.get(cmdInteraction.commandName);

    if (!command) return;

    try {
      await command.execute(cmdInteraction);
    } catch (err) {
      logger.error(err, "Command execution failed");

      const reply = {
        content: "There was an error executing this command.",
        ephemeral: true,
      };

      if (cmdInteraction.replied || cmdInteraction.deferred) {
        await cmdInteraction.followUp(reply).catch(() => {});
      } else {
        await cmdInteraction.reply(reply).catch(() => {});
      }
    }
  });

  client.on("error", (err) => {
    logger.error(err, "Discord client error");
  });

  client.on("disconnect", () => {
    logger.warn("Bot disconnected (reconnecting handled by Discord.js)");
  });

  await client.login(token);
}

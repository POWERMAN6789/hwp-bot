import { Client, GatewayIntentBits } from "discord.js";
import { commands } from "./commands/index.js";

export async function startBot() {
  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  client.once("ready", () => {
    console.log(`Logged in as ${client.user?.tag}`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);

      await interaction.reply({
        content: "Error running command.",
        ephemeral: true,
      });
    }
  });

  await client.login(process.env.DISCORD_TOKEN);
}

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("hwphelp")
  .setDescription("Shows a list of available HWP bot commands");

export async function execute(interaction: ChatInputCommandInteraction) {
  const helpMessage = `
**HWP Bot Commands**

/hwphelp - Shows this help menu  
/ping - Test if the bot is online  

(Other commands can be added here later)
`;

  await interaction.reply({
    content: helpMessage,
    ephemeral: true,
  });
}

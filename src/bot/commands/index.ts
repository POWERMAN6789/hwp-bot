import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

type Command = {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong"),
  async execute(interaction) {
    await interaction.reply("pong");
  },
};

export const commands = new Map<string, Command>([
  ["ping", ping],
]);

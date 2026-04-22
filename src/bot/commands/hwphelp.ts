import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("hwphelp")
  .setDescription("Shows all available HWP bot commands");

export async function execute(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setTitle("HWP Bot — Help Menu")
    .setColor(0x2c3e50)
    .setDescription("Here are all available HWP commands:")
    .addFields(
      {
        name: "/hwpdemote",
        value: "Issue a demotion announcement.\nOptions: user, old_rank, new_rank, reason",
      },
      {
        name: "/hwppromote",
        value: "Issue a promotion announcement.\nOptions: user, old_rank, new_rank, reason",
      },
      {
        name: "/hwptrainingrequest",
        value: "Submit a training request.\nOptions: trainee, chat_age, how_joined, training_type, ping_role",
      },
      {
        name: "/hwphosttraining",
        value: "Announce a training session.\nOptions: trainer, trainer_chat_age, training_type, where, when, gear, uniform, ping_role",
      },
      {
        name: "/hwpinfract",
        value: "Issue a warning or strike.\nOptions: user, type, reason",
      },
      {
        name: "/hwpdeploy",
        value: "Announce a deployment.\nOptions: host, host_age, promotional, where, when, gear, uniform, ping_role",
      },
      {
        name: "/hwpquestion",
        value: "Post a question with a thread for answers.",
      },
      {
        name: "/reporthwpbotbug",
        value: "Report a bug in the bot.",
      },
      {
        name: "/hwpboton",
        value: "Check if the bot is online.",
      }
    )
    .setTimestamp();

  await interaction.reply({
    embeds: [embed],
    ephemeral: true,
  });
}

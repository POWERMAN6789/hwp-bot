import * as hwpdemote from "./hwpdemote.js";
import * as hwppromote from "./hwppromote.js";
import * as hwptrainingrequest from "./hwptrainingrequest.js";
import * as hwphosttraining from "./hwphosttraining.js";
import * as hwpinfract from "./hwpinfract.js";
import * as hwpdeploy from "./hwpdeploy.js";
import * as hwpquestion from "./hwpquestion.js";
import * as hwphelp from "./hwphelp.js";
import * as reporthwpbotbug from "./reporthwpbotbug.js";
import * as hwpboton from "./hwpboton.js";

import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export const commands: Map<string, Command> = new Map([
  ["hwpdemote", hwpdemote as Command],
  ["hwppromote", hwppromote as Command],
  ["hwptrainingrequest", hwptrainingrequest as Command],
  ["hwphosttraining", hwphosttraining as Command],
  ["hwpinfract", hwpinfract as Command],
  ["hwpdeploy", hwpdeploy as Command],
  ["hwpquestion", hwpquestion as Command],
  ["hwphelp", hwphelp as Command],
  ["reporthwpbotbug", reporthwpbotbug as Command],
  ["hwpboton", hwpboton as Command],
]);

export const commandDataArray = Array.from(commands.values()).map(
  (cmd) => cmd.data.toJSON()
);

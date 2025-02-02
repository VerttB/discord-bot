import { SlashCommandBuilder } from "discord.js";


export const data = new SlashCommandBuilder().setName('cainan').setDescription('Replies with the username')

export const execute = async (interaction) => {
    await interaction.reply(`Esse cara é troll demais`);
}
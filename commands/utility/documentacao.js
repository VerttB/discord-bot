import { SlashCommandBuilder } from "discord.js";


export const data = new SlashCommandBuilder().setName('doc').setDescription('Replies with the username')

export const execute = async (interaction) => {
    await interaction.reply(`https://discordjs.guide/#before-you-begin`);
}
import { SlashCommandBuilder } from "discord.js";


export const data = new SlashCommandBuilder().setName('user').setDescription('Replies with the username')

export const execute = async (interaction) => {
    await interaction.reply(`Command run by ${interaction.user.username}`);
}
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { fileURLToPath , pathToFileURL } from 'url';
import fs from 'node:fs';
import path from 'node:path'
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = new Client({intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection();

const folderPath = path.join(__dirname, 'commands');
const commandFolder = fs.readdirSync(folderPath);

(async () => {
    for (const folder of commandFolder) {
        const commandPath = path.join(folderPath, folder);
        const commandFiles = fs.readdirSync(commandPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandPath, file);
            const command = await import(pathToFileURL(filePath).href);

            if ('data' in command && 'execute' in command) {
                console.log('Added command', command.data.name);
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
})();


client.once(Events.ClientReady, readyClient => {
        console.log(`Logged as ${readyClient.user.tag}`);
 });


 client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

 client.login(process.env.BOT_TOKEN);

 
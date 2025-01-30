import { Client, Events, GatewayIntentBits } from "discord.js";
import 'dotenv/config';

const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, readyClient => { 
    console.log(`Logged as ${readyClient.user.tag}`);
 })
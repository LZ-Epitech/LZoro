import axios from 'axios';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent] });

// Token du bot à partir du fichier .env
const BOT_TOKEN = "MTIzOTc5NzI3ODUzMzc0NjczMg.GmjzcQ.Y1J9V6xqrcjnYoQOIzMgU7ccS9A9jc6B-ctnNw";

// Quand le bot est prêt
client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

async function getUserId(token) {
    try {
        const response = await axios.get('https://discord.com/api/v10/users/@me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const userId = response.data.id;
        return userId;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

async function sendMessageToUser(token, message) {
    try {
        const userId = await getUserId(token);
        const user = await client.users.fetch(userId);
        await user.send(message);
        console.log(`Message sent to ${user.tag}`);
    } catch (error) {
        const userId = await getUserId(token);
        const user = await client.users.fetch(userId);
        if (error.code === 50007) {
            console.error(`Cannot send messages to ${token} / ${user}. Possible reasons:`);
            console.error('- User has disabled direct messages from this bot or server.');
            console.error('- User has blocked the bot.');
            console.error('- User has disabled direct messages from non-friends.');
        } else {
            console.error('Error sending message:', error);
        }
    }
}

client.login(BOT_TOKEN);

export { sendMessageToUser };

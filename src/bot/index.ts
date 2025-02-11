const { Telegraf } = require('telegraf');
const { BOT_TOKEN, WEBAPP_URL } = require('./config');

if (!BOT_TOKEN) {
    throw new Error('BOT_TOKEN is required');
}

const bot = new Telegraf(BOT_TOKEN);

bot.command('start', (ctx: any) => {
    ctx.reply("Welcome to Task Board!")
});

bot.command('help', (ctx: any) => {
    ctx.reply(
        "Help message\n"+
        '/start - Start the bot\n' +
        '/help - Show this help message\n' +
        '/webapp - Open the Mini App'
    )
});

bot.command('webapp', (ctx: any) => {
    ctx.reply('Open the Mini App:', {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Open', url: WEBAPP_URL }]
            ]
        }
    });
});

bot.launch().then(() => {
    console.log('Bot is running');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));


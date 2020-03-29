const Telegraf = require('telegraf'),
      extra = require('telegraf/extra'),
      markup = extra.markdown(),
      { tokens } = require('./config'),
      { getInfectedByCovid } = require('./lib/covid-module')

const bot = new Telegraf(tokens.telegram)

function sendVirusInfected(data, ctx) {
  const message =
  `*Resumen del covid-19 en España (${data.date}) 😷*
  😠 *Total confirmados:* ${data.today_confirmed}
  😭 *Total fallecidos:* ${data.today_deaths}
  😞 *Total fallecidos hoy:* ${data.today_new_deaths}
  🦠 *Total infectados activos:* ${data.today_open_cases}
  💪 *Total recuperados:* ${data.today_recovered}
  👏 *Total recuperados hoy:* ${data.today_new_recovered}`

  ctx.reply(message, markup)
}

function sendVirusError(message, ctx) {
  ctx.reply(message, markup)
}

bot.start((ctx) => ctx.reply('Hola, ¿qué necesitas saber?'))
bot.help((ctx) => ctx.reply('Teclea /summary para ver un resumen'))
bot.on('sticker', (ctx) => ctx.reply('😎'))
bot.command('summary', ctx => {
  getInfectedByCovid()
    .then(data => sendVirusInfected(data, ctx))
    .catch(() =>  sendVirusError(`No tenemos los datos de hoy aún 😷`, ctx))
})

bot.launch()
const Discord = require('discord.js')
const client = new Discord.Client()
const axios = require('axios')
client.on('message', msg => {
  axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate', {
    params: {
      key: 'YANDEX_KEY',
      text: msg.content,
      lang: 'en'
    }
  }).then(res => {
    if (res.data.text[0] !== msg.content) {
      msg.reply(res.data.text[0])
    }
  })
})
client.login("DISCORD_BOT_TOKEN")
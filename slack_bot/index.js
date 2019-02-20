const SlackBot = require('slackbots')
const axios = require('axios')

const bot = new SlackBot({
    token: 'xoxb-554910334017-555362382515-22S5Zl4scyJFf0sfUayJiK8r',
    name: 'jokebot'
})

bot.on('start', function () {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    const params = {
        icon_emoji: ':cat:'
    };

    bot.postMessageToChannel(
        'general',
        'Get Ready To Laugh with @Jokebot!',
        params
    )

    bot.on('error', (err) => console.log(err))

    bot.on('message', (data) => {
        if (data.type !== 'message') {
            return
        }
        handleMessage(data.text);
    })
});

function handleMessage(message) {
    if (message.includes(' chucknorris')) {
        chuckJoke();
    } else if (message.includes(' yomama')) {
        yoMamaJoke();
    } else if (message.includes(' random')) {
        randomJoke();
    } else if (message.includes(' help')) {
        runHelp();
    }
}

function chuckJoke() {
    axios.get('http://api.icndb.com/jokes/random').then(res => {
        const joke = res.data.value.joke;

        const params = {
            icon_emoji: ':laughing:'
        };

        bot.postMessageToChannel('general', `Chuck Norris: ${joke}`, params);
    });
}

function yoMamaJoke() {
    axios.get('http://api.yomomma.info').then(res => {
        const joke = res.data.joke;

        const params = {
            icon_emoji: ':laughing:'
        };

        bot.postMessageToChannel('general', `Yo Mama: ${joke}`, params);
    });
}

function randomJoke() {
    const rand = Math.floor(Math.random() * 2) + 1;
    if (rand === 1) {
        chuckJoke();
    } else if (rand === 2) {
        yoMamaJoke();
    }
}

function runHelp() {
    const params = {
        icon_emoji: ':question:'
    };

    bot.postMessageToChannel(
        'general',
        `Type @jokebot with either 'chucknorris', 'yomama' or 'random' to get a joke`,
        params
    );
}
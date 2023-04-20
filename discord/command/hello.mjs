import 'dotenv/config'
import { default as axios } from 'axios';

let url = `https://discord.com/api/v8/applications/${process.env.APP_ID}/guilds/${process.env.GUILD_ID}/commands`

const headers = {
  "Authorization": `Bot ${process.env.BOT_TOKEN}`,
  "Content-Type": "application/json"
}

let command_data = {
  "name": "foo",
  "type": 1,
  "description": "replies with bar2 ;/",
}

axios.post(url,
  JSON.stringify(command_data),
  {
    headers: headers,
  })
  .then(r => console.log(r))
  .catch(r => console.log(r))
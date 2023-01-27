import * as dotenv from 'dotenv'
dotenv.config()
import Bot from './discord/bot.js'

console.log(process.env.TOKEN)

Bot()

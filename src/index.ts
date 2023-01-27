import * as dotenv from 'dotenv'
dotenv.config()
import Bot from './discord/bot.js'

const PERMISSIONS = 2147485696
const CLIENT_ID = process.env.DISCORD_CLIENT
const SCOPE = 'bot%20applications.commands'
console.log(
  `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&permissions=${PERMISSIONS}&scope=${SCOPE}`
)

Bot()
/*{
  "id": "JEYiokaxuRj6aYDTjmMTRD7XMUGsq3NWn_sccl3ooqkruSc",
  "accountId": "tIR73CC8S18p-oXvCeRPQQdQR-YPGue2maitxWZOYJDQEw",
  "puuid": "9FjB6i7tI4u23tLjO7Rn_VJ2P23M1FGP4bzndCLpQwYyQHBJ9LpQ2EbZn4zCdRzmmZqpbgsCKf0aNQ",
  "name": "delicious ice",
  "profileIconId": 4778,
  "revisionDate": 1674769188688,
  "summonerLevel": 348
}*/

/*const x = await lolFetch(
  '/lol/summoner/v4/summoners/by-name/delicious ice',
  AccountSchema
)*/

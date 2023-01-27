import { Client } from 'discord.js'
import interactionCreate from './interactions/interaction.js'
import ready from './listeners/ready.js'

const Bot = async () => {
  // create client
  const client = new Client({ intents: [] })

  // add event listeners
  await client.login(process.env.TOKEN)
  interactionCreate(client)
  ready(client)
  // login

  console.log('hi')
}

export default Bot

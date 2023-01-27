import type { Client } from 'discord.js'
import { Commands } from '../interactions/register.js'

export default async (client: Client) => {
  if (!client.user || !client.application) {
    return
  }
  console.log(`${client.user.username} is online`)

  await client.application.commands.set(Commands)
}

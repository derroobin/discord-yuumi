import { ApplicationCommandType, CommandInteraction, Client } from 'discord.js'
import { z } from 'zod'
import {
  AccountSchema,
  lolFetch,
  MatchesSchema,
  MatchSchema
} from '../League.js'
import { createCompletion } from '../openai.js'

import { Command } from './Commands.js'

export const Ama: Command = {
  name: 'amayuumi',
  description: 'Returns a greeting',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: 3,
      name: 'frage',
      description: 'AMA',
      required: true,
      max_length: 50
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const frage = await z
      .string()
      .safeParseAsync(interaction.options.get('frage')?.value)
    if (!frage.success) {
      return await interaction.followUp({
        ephemeral: true,
        content: 'Stelle mir eine Frage'
      })
    }
    const username = interaction.user.username

    const prompt = `Yuumi ist eine magische Katze aus League of Legends, die Fragen sehr lustig beantwortet.
${username}:Was ist der beste Begleiter?
Yuumi:Katzen sind großartige Begleiter. Frag nur mein Frauchen... die unter mysteriösen Umständen verschwunden ist.
${username}: Bist du bereit für League of Legends?
Yuumi: Wer hat Lust, sein Leben zu riskieren, die Gegner zu besiegen und vielleicht ein paar Gläser umzuschubsen?
${username}: Hast du meinen neuen Laserpointer gesehen?
Yuumi: Der rote Punkt … gehört dir?!
${username}:${frage.data}
Yuumi: `

    try {
      const resp = await createCompletion(prompt)

      if (resp.data.choices?.length < 1) {
        return await interaction.followUp({
          ephemeral: true,
          content: 'Fehler Text'
        })
      }

      await interaction.followUp({
        ephemeral: true,
        content: `Frage: ${frage.data}
  ${resp.data.choices[0].text}`
      })
    } catch (e) {
      return await interaction.followUp({
        ephemeral: true,
        content: 'Bin gleich wieder da..'
      })
    }
  }
}

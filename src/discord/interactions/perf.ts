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

export const Perf: Command = {
  name: 'askyuumi',
  description: 'Returns a greeting',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: 3,
      name: 'name',
      description: 'a League of Legends username',
      required: true
    },
    {
      type: 3,
      name: 'frage',
      description: 'Stelle eine Frage zu dem Spiel',
      required: true
    }
  ],
  run: async (client: Client, interaction: CommandInteraction) => {
    const name = await z
      .string()
      .safeParseAsync(interaction.options.get('name')?.value)
    const frage = await z
      .string()
      .safeParseAsync(interaction.options.get('frage')?.value)
    if (!name.success || !frage.success) {
      return await interaction.followUp({
        ephemeral: true,
        content: 'Please add a username'
      })
    }

    const account = await lolFetch(
      `/lol/summoner/v4/summoners/by-name/${name.data}`,
      AccountSchema
    )
    if (!account.success || !account.data.puuid) {
      return await interaction.followUp({
        ephemeral: true,
        content: 'Konnte Spieler nicht finden'
      })
    }

    const lastMatch = await lolFetch(
      `/lol/match/v5/matches/by-puuid/${account.data.puuid}/ids?count=1`,
      MatchesSchema,
      'europe'
    )

    if (!lastMatch.success || lastMatch.data.length < 1) {
      return await interaction.followUp({
        ephemeral: true,
        content: 'Problem bei Matchesabfrage'
      })
    }

    const matchData = await lolFetch(
      `/lol/match/v5/matches/${lastMatch.data[0]}`,
      MatchSchema,
      'europe'
    )

    if (!matchData.success || matchData.data.info.participants.length < 1) {
      return await interaction.followUp({
        ephemeral: true,
        content: 'Fehler bei Matchabfrage'
      })
    }

    const keys = Object.keys(matchData.data.info.participants[0])

    const info = matchData.data.info.participants
      .map((player) => keys.map((key) => player[key]).join(' | '))
      .join('\n')

    const table = [keys.join(' | '), info].join('\n')
    const prompt = `Du bist Yuumi, eine magische Katze aus League of Legends, die Fragen sehr lustig beantwortet. Du kannst auch Smileys verwenden.
Beantworte nur Fragen zu diesem Spiel.

    In der folgenden Tabelle siehst du die Statistik aus einem League of Legends Spiel:
    ${table}

${frage.data}`

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
  }
}

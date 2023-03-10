import { z } from 'zod'
import fetch from 'node-fetch'

export const lolFetch = async <Type>(
  path: string,
  schema: z.Schema<Type>,
  server = 'euw1'
) => {
  const req = await fetch(`https://${server}.api.riotgames.com` + path, {
    headers: {
      'X-Riot-Token': process.env.RIOT
    }
  })

  const json = await (await req).json()
  return schema.safeParseAsync(json)
}

export const AccountSchema = z.object({
  accountId: z.string(),
  name: z.string(),
  id: z.string(),
  puuid: z.string()
})

export const MatchesSchema = z.array(z.string())

export const MatchSchema = z.object({
  info: z.object({
    participants: z.array(
      z.object({
        summonerName: z.string(),
        championName: z.string(),
        kills: z.number(),
        deaths: z.number(),
        assists: z.number(),
        champLevel: z.number(),
        totalDamageDealtToChampions: z.number(),
        teamPosition: z.string(),
        teamId: z.number(),
        totalHeal: z.number(),
        totalHealsOnTeammates: z.number(),
        totalMinionsKilled: z.number(),
        totalDamageTaken: z.number(),
        visionScore: z.number(),
        win: z.boolean(),
        killingSprees: z.number()
      })
    )
  })
})

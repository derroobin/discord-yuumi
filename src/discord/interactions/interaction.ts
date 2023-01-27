import { Events, CommandInteraction, Client, Interaction } from 'discord.js'
import { Commands } from './register.js'

export default (client: Client): void => {
  console.log('')
  client.on(Events.InteractionCreate, async (interaction: Interaction) => {
    console.log('creating interaction..')
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction)
    }
  })
}

const handleSlashCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name === interaction.commandName)
  if (!slashCommand) {
    interaction.followUp({ content: 'An error has occurred' })
    return
  }

  await interaction.deferReply()

  slashCommand.run(client, interaction)
}

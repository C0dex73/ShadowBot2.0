import loadSlashInteractions from '../loaders/loadSlashInteractions';
import print from '../utils/consoleHandler';
import { LogLevel } from '../utils/consoleHandler';
import ICommand from 'src/utils/command';
import ClientWithCommands from 'src/utils/clientWithCommands';
import Discord, { messageLink } from 'discord.js';

export default {
    listener : async (bot:ClientWithCommands, interaction:Discord.Interaction) : Promise<void> => {
        if(interaction.type === Discord.InteractionType.ApplicationCommand){
            let command:ICommand = await require(`../commands/${interaction.commandName}`).default;
            print(interaction.user.username + " --> " + interaction.commandName, LogLevel.Info);
            try{
                await command.run(bot, interaction)
            }catch(err){
                print(err, LogLevel.Error);
                interaction.reply("Sorry, an error has occurred. Please try again. If this persists, contact and administrator.");
            }
        }
    }
}
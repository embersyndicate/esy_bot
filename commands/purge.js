exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["purge", "pur", "p"],
  permLevel: "Moderator"
};

exports.help = {
  name: "purge",
  category: "General",
  description: "Used to clean clutter from discord text channels.",
  usage: "purge <# of lines>"
};

exports.run = async (client, message, args, level) => {
  var quanity = args[0];
	if (typeof quanity == 'undefined'){
				message.delete;
    			message.channel.bulkDelete(20)
    				.then(messages => client.logger.log('[LOG]Bulk deleted '+messages.size+' messages from '+message.channel.name))
    				.catch(console.error);
            return;
    		} else {
    			message.delete;
    			message.channel.bulkDelete(quanity)
    			    .then(messages => client.logger.log('[LOG]Bulk deleted '+messages.size+' messages from '+message.channel.name))
    				.catch(console.error);
            return;
    		}

}
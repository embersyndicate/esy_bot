exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unregister", "unreg", "ur"],
  permLevel: "User"
};

exports.help = {
  name: "unregister",
  category: "PS2 Outfit",
  description: "Used to register on discord. If you registering for a game no username used!",
  usage: "unreg <Faction> | unreg <game>  \nAcceptable Faction: NC, VS, TR\nAcceptable Games: ARK, SE, MC, DND, ROK\nAcceptable Games: ARK, SE, MC, DND, ROK\nAcceptable channels: NSFW COURT\nEx: !unreg NC | !unreg ark | !unreg NSFW"
};

exports.run = async (client, message, args, level) => {
	faction = args[0];
	if(!faction) return(message.channel.send('No Arrgument provided!'));
	faction = faction.toLowerCase();

	if(faction == 'court') {
		//EmberCraft
		let court_role = message.guild.roles.find('name', 'EmbersCourt');
		message.member.removeRole(court_role);
		message.channel.send('<'+message.author+'> `You have successfully unregistered from the Courtroom RP channel!');
		return;
	}

	if(faction == 'mc') {
		//EmberCraft
		let mc_role = message.guild.roles.find('name', 'EmberCraft');
		message.member.removeRole(mc_role);
		message.channel.send('<'+message.author+'> `You have successfully unregistered from the Minecraft servers!');
		return;
	}

	if(faction == 'nsfw') {
		//NSFW
		let nsfw_role = message.guild.roles.find('name', 'nsfw');
		message.member.removeRole(nsfw_role);
		message.channel.send('<'+message.author+'> You have unregistered from the NSFW channel.');
	}

	if(faction == 'rok') {
		//ROK
		let rok_role = message.guild.roles.find('name', 'Rok member');
		message.member.removeRole(rok_role);
		message.channel.send('<'+message.author+"> `You have successfully unregistered from Reign of Kings.");
		return;
	}

		if(faction == 'dnd') {
		//ROK
		let rok_role = message.guild.roles.find('name', 'DnD Nerds');
		message.member.removeRole(rok_role);
		message.channel.send('<'+message.author+"> `You have successfully unregistered from Dungeon and Dragons.");
		return;
	}

	if(faction == 'ark') {
		//Ark Survivalist
		let ark_role = message.guild.roles.find('name', 'Ark Survivalist');
		message.member.removeRole(ark_role);
		message.channel.send('<'+message.author+'> You hace successfully registered from the ARK Survival Evolved cluster!');
		return;
	}

	if(faction == 'se') {
		//Space Engineer
		let se_role = message.guild.roles.find("name", "Space Engineer");
		message.member.removeRole(se_role);
		message.channel.send('<'+message.author+'> `You have successfully unregistered from Space Engineers server!');
		return;
	}

		if(faction == 'nc') {
		//Space Engineer
		let se_role = message.guild.roles.find("name", "NC main");
		message.member.removeRole(se_role);
		message.channel.send('<'+message.author+'> You have successfully unregistered from our NC outfit!');
		return;
	}

		if(faction == 'tr') {
		//Space Engineer
		let se_role = message.guild.roles.find("name", "TR main");
		message.member.removeRole(se_role);
		message.channel.send('<'+message.author+'> `You have successfully unregistered from our TR outfit!');
		return;
	}

		if(faction == 'vs') {
		//Space Engineer
		let se_role = message.guild.roles.find("name", "VS main");
		message.member.removeRole(se_role);
		message.channel.send('<'+message.author+'> `You have successfully unregistered from our VS outfir!');
		return;
	}
	message.channel.send("Sorry we couldn't find what channel you wanted to unregister from!\n If you need help simply type !help unregister");
}
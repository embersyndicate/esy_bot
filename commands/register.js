// This file is the register command for the diffrent outfits!
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["register", "reg", "r"],
  permLevel: "User"
};

exports.help = {
  name: "register",
  category: "PS2 Outfit",
  description: "Used to register on discord. If you registering for a game no username used!",
  usage: "reg <Faction><username> | reg <game> | reg <channel>\nAcceptable Faction: NC, VS, TR\nAcceptable Games: ARK, SE, MC, DND, ROK\nAcceptable channels: NSFW COURT\nEx: !reg NC ingame_Name | !reg ark | !reg NSFW"
};

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var request = require("request");
	var faction = args[0];
	if(!faction) return(message.channel.send('No Arrgument provided!'));
	faction = faction.toLowerCase();

/*  Not used yet
	function getRole(name) {
		let role = message.guild.roles.find('name', name);
		return (role);
	}
<<<<<<< HEAD
	var factionFound = false;
=======
*/

	if(faction == 'civ') {
		let civ_role = message.guild.roles.find('name', 'Civ builder');
		message.member.addRole(civ_role);
		message.channel.send('<'+message.author+'> You have successfully registered for our Civilization 6 Group');
	}
	
>>>>>>> 715ebba49e019ca85617b65437a7b292e3b62774
	if(faction == 'court') {
		//EmbersCourt
		//await role = getRole('EmbersCourt')
		let court_role = message.guild.roles.find('name', 'EmbersCourt');
		message.member.addRole(court_role);
		message.channel.send('<'+message.author+'> You have successfully registered for our Courtroom RP channel!');
		factionFound = true;
		return;
	}

	if(faction == 'mc') {
		//EmberCraft
		let mc_role = message.guild.roles.find('name', 'EmberCraft');
		message.member.addRole(mc_role);
		message.channel.send('<'+message.author+'> You have successfully registered for our Minecraft server!');
		factionFound = true;
		return;
	}

	if(faction == 'nsfw') {
		//NSFW
			let nsfw_role = getRole('nsfw');
			message.member.addRole(nsfw_role);
			message.channel.send('<'+message.author+'> You have registered for the NSFW 18+ channel.\nIf you are not of the age of 18 please don\'t enter the channel');
			factionFound = true;
	}

	if(faction == 'rok') {
		//ROK
		let rok_role = message.guild.roles.find('name', 'Rok member');
		message.member.addRole(rok_role);
		message.channel.send('<'+message.author+"> You have successfully registered for our Reign of Kings");
		factionFound = true;
		return;
	}

		if(faction == 'dnd') {
		//ROK
		let rok_role = message.guild.roles.find('name', 'DnD Nerds');
		message.member.addRole(rok_role);
		message.channel.send('<'+message.author+"> You have successfully registered for Dungeon and Dragons");
		factionFound = true;
		return;
	}

	if(faction == 'ark') {
		//Ark Survivalist
		let ark_role = message.guild.roles.find('name', 'Ark Survivalist');
		message.member.addRole(ark_role);
		message.channel.send('<'+message.author+'> You hace successfully registered for our ARK Survival Evolved server!');
		factionFound = true;
		return;
	}

	if(faction == 'se') {
		//Space Engineer
		let se_role = message.guild.roles.find("name", "Space Engineer");
		message.member.addRole(se_role);
		message.channel.send('<'+message.author+'> You have successfully registered for our Space Engineers server!');
		factionFound = true;
		return;
	}
	var obj = client.config.factions;
	for (var key in obj) {
		if(key == faction) {
			factionFound = true;
			var user = args[1];
			if(!user) return(message.channel.send('No username provided!'));
			//set faction ID
			var fID = client.config.factions[faction];
			//prepare request url
			var req_url = "https://census.daybreakgames.com/s:embersyndicate/get/ps2:v2/character?name.first="+user+"&faction_id="+fID+"&c:resolve=outfit_member_extended";
			request({
				url: req_url,
				json: true
			}, function(err,res,body){
				if(!err && res.statusCode == 200) {
					var clist = body.character_list[0];
					if(!body.returned == 0) {
						//check if outift is set
						if(typeof clist.outfit_member == 'undefined') return(message.channel.send('<'+message.author+'> Sorry I couldn\'t find a user in the outfit by that username.\n Please try again! Example: !reg ns someguysusername DEBUG:: NO OUTFIT SET'));
						var ticker = clist.outfit_member.alias;
						//message.channel.send(ticker);
						// is user in outfit
						if(clist.outfit_member.outfit_id == client.config.outfitIds[faction]){
						var lastOnline = clist.times.last_login_date;
						const user_store = users_db.get(message.author.id) || { faction: '', username: '', last_online: ''};
						user_store.faction = faction;
						user_store.username = user;
						user_store.last_online = lastOnline;
						users_db.set(message.author.id, user_store);
						let role = message.guild.roles.find("name", clist.outfit_member.member_rank);
						let faction_role = message.guild.roles.find("name", faction.toUpperCase()+' main');
						message.member.addRole(role, "Successful registration").catch(console.error);
						message.member.addRole(faction_role, "Successful registration").catch(console.error);
						message.member.setNickname('['+clist.outfit_member.alais+']'+user);
						message.channel.send('<'+message.author+'> Thank you for registering! You should now have access to all the channels!');
						return;
						}else{
							message.channel.send('<'+message.author+'> Sorry I couldn\'t find a user in Ember Syndicate by that username.\n We will go ahead and apply our Ally role! Enjoy Your stay!');
							let ally_role = message.guild.roles.find("name", 'Allied outfit member');
							let faction_role = message.guild.roles.find("name", faction.toUpperCase()+' main');
							message.member.addRole(ally_role);
							message.member.setNickname('['+ticker+']  '+user);
							return;

						}
					}else{
						//Message sent if the api returns a value of 0 
						message.channel.send('Sorry I couldn\'t find the username you provided. Please remember it is case-sensitive!');
						return;
					}
				}	
			});			
		}
	}// end of for
	//If the faction is not identified it sends this error message
	if(factionFound == false){
		message.channel.send("Sorry I couldn\'t recognize that name, for registration help type !help registration");
	}

};
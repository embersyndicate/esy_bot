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
  usage: "reg ps2 <faction> <username> | reg <game> | reg <channel>\nAcceptable Faction: NC, VS, TR\nAcceptable Games: ARK, SE, MC, DND, ROK,PIX,CIV,PS2\nAcceptable channels: NSFW COURT\nEx: !reg ps2 NC ingame_Name | !reg ark | !reg NSFW"
};

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var request = require("request");
	var  = args[0];
	if(!faction) return(message.channel.send('No Arrgument provided! Need help? Try !help register.'));
	faction = faction.toLowerCase();
	// pass data to factionCheck
	factionCheck(faction);
	//Switch to figure out what reg we need
	
/*	
	var obj = client.config.factions;
	for (var key in obj) {
		if(key == faction) {
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
						message.channel.send(ticker);
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
							message.member.setNickname('['+ticker+']'+user);
							message.member.addRole(faction_role, "Successful registration").catch(console.error);

						}
					} 
				}	
			});			
		}
	}// end of for	
*/
return;

function factionCheck(faction) {
	switch (faction) {
		case 'ps2':
			var obj = client.config.factions;
			for (var key in obj) {
				if(key == faction) {
					var user = args[2];
					if(!user) return(message.channel.send('No username provided!'));
					//set faction ID
					var fID = client.config.factions[faction];
					//prepare request url
					var req_url = "https://census.daybreakgames.com/s:embersyndicate/get/ps2:v2/character?name.first="+user+"&faction_id="+fID+"&c:resolve=outfit_member_extended";
				}
			}
			break;

		case 'civ': 
			if (setRole('Civ builder')) {
				message.channel.send('<'+message.author+' You have successfully for Civilization 6!');
				break;
			}  else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'court':
			if (setRole('EmbersCourt')) {
				message.channel.send('success');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'mc':
			if (setRole('EmberCraft')) {
				message.channel.send('success');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'nsfw':
			if (setRole('nsfw')) {
				message.channel.send('success');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'rok':
			if (setRole('Rok member')) {
				message.channel.send('success');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'dnd':
			if (setRole('DnD Nerds')) {
				message.channel.send('success');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'ark':
			if (setRole('Ark Survivalist')) {
				message.channel.send('success');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'se':
			if (setRole('Space Engineer')) {
				message.channel.send('success');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'pix':
			if (setRole('PixARK')) {
				message.channel.send('success');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}
		default:
			message.channel.send('You must provide a faction, channel, or server. Need help? Try !help register.');
			break;
	}
}


	function setRole(name) {
		let role = message.guild.roles.find('name', name);
		if (role == null) {
			return false;
		} else {
			message.member.addRole(role).then(messages => client.logger.log('Role '+name+' added to '+message.member.displayName));	
			return true;
		}
	}
}
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
	var game = args[0];
	if(!game) return(message.channel.send('No Arrgument provided! Need help? Try !help register.'));
	game = game.toLowerCase();
	// pass data to factionCheck
	gameCheck(game);	
return;

function gameCheck(game) {
	switch (game) {
		case 'ps2':
			var obj = client.config.factions;
			var faction = args[1];
			faction = faction.toLowerCase();
			//Make sure the faction matches the avaliable factions or break
			if (!['tr','vs','nc'].includes(faction)) return(message.channel.send('Please provide a valid faction. Need help? Try !help register.'));
			// For loop to cycle through the diffrent factions also allowing us to pull outfit ID's by what faction the for loop is checking
			for (var key in obj) {
				if(key == faction) {
					var user = args[2];
					if (!user) {
						message.channel.send('No username provided! Need help? Try !help register.');
						return;
					}
					//set faction ID
					var fID = client.config.factions[faction];
					//prepare request url
					var req_url = "https://census.daybreakgames.com/s:embersyndicate/get/ps2:v2/character?name.first="+user+"&faction_id="+fID+"&c:resolve=outfit_member_extended";
					message.channel.send(req_url);
					//preform request
					request({
						url: req_url,
						json: true
					}, function(err,res,body) {
						//if there were no errors
						if(!err && res.statusCode == 200) {
							//Make sure we returned character data.
							if (body.returned == 0) return(message.channel.send('No user found on '+ faction.toUpperCase()+' with that username! Need help? Try !help register.'));
							//set variable to the json provided by the API
							var clist = body.character_list[0];
							// check if member is in an outfit if not break
							if(clist.outfit_member == 'undefined') return(message.channel.send('<'+message.author+'> Sorry I couldn\'t find a user in an outfit with that username. Need help? Try !hep register.'));
							// check that outfit_id is set if not break
							if(clist.outfit_member.outfit_id == 'undefined') return(message.channel.send('<'+message.author+'> Sorry I couldn\'t find a user in an outfit with that username. Need help? Try !hep register.'));
							// Check if user is in ESY
							if (clist.outfit_member.outfit_id == client.config.outfitIds[faction]) {

								var lastOnline = clist.times.last_login_date;
								//setup local db for users factions and lastonline
								const user_store = users_db.get(message.author.id) || { faction: '', username: '', last_online: ''};
								user_store.faction = faction;
								user_store.username = user;
								user_store.last_online = lastOnline;
								//apply info to the database
								users_db.set(message.author.id, user_store);
								//get faction an ps2 role
								let faction_role = message.guild.roles.find("name", faction.toUpperCase()+' main');
								let ps2_role = message.guild.roles.find('name', 'Planetside 2');
								//set roles
								message.member.addRole(ps2_role, "Successful registration").catch(console.error);
								message.member.addRole(faction_role, "Successful registration").catch(console.error);
								//set ticer and username
								var ticker = clist.outfit_member.alias
								message.member.setNickname('['+ticker+'] '+user);
								//send success message
								message.channel.send('<'+message.author+'> Thank you for registering! You should now have access to the outfit channels!');
								return;
							} else {
								// not in ember but in a outfit on that faction
								// get roles
								let ally_role = message.guild.roles.find("name", 'Allied outfit member');
								// set roles
								message.member.addRole(ally_role);
								//set nick
								var ticker = clist.outfit_member.alias;
								message.member.setNickname('['+ticker+'] '+user);
								//Success message
								// not in ember but in ps2 outfit for that faction add ally role
								message.channel.send('<'+message.author+'> Sorry I couldn\'t find a user in Ember Syndicate by that username.\n We will go ahead and apply our Ally role! Enjoy Your stay!');
								return;
							}

						} else {
							// there were errors with the request
							message.channel.send('There were errors with the register contact DJDeath');
							client.logger.error('Error code from the request: '+err);
							return;
						}
					});
				} 
			}
			break;

		case 'civ': 
			if (setRole('Civ builder')) {
				message.channel.send('<'+message.author+'> You have successfully registered for Civilization 6 channels!');
				break;
			}  else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'court':
			if (setRole('EmbersCourt')) {
				message.channel.send('<'+message.author+'> You have successfully registered for Embers Court RP channels!');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'mc':
			if (setRole('EmberCraft')) {
				message.channel.send('<'+message.author+'> You have successfully registered for the EmberNetowrk Minecraft channels!');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'nsfw':
			if (setRole('nsfw')) {
				message.channel.send('<'+message.author+'> You have registered for the NSFW 18+ channel.\nIf you are not of the age of 18+ please don\'t enter the channel');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'rok':
			if (setRole('Rok member')) {
				message.channel.send('<'+message.author+'> You have registered for our Reign of Kings channels!');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'dnd':
			if (setRole('DnD Nerds')) {
				message.channel.send('<'+message.author+'> You have registered for our Dungeons and Dragons channels!');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'ark':
			if (setRole('Ark Survivalist')) {
				message.channel.send('<'+message.author+'> You have registered for our ARK:Survival Evolved channels!');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'se':
			if (setRole('Space Engineer')) {
				message.channel.send('<'+message.author+'> You have registered for our Space Engnieers channels!');
				break;
			} else {
				message.channel.send('There was an error please contact DJDeath!');
				break;
			}

		case 'pix':
			if (setRole('PixARK')) {
				message.channel.send('<'+message.author+'> You have registered for our PixARK channels!');
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
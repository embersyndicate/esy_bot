// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  	member.sendMessage("\n__***Welcome to Ember Syndicate***__\n***As*** *a member of Ember Syndicate you have access to our entire gaming network. from our dedicated outfits in Planetside 2, to our hosted servers on our own network cluster. Minecraft, Ark, Space Engineers, Reign of Kings, and more to come! You can connect to any of our hosted servers with direct ip:* ***EmberSyndicate.com*** *using default ports for each server. If you would like to gain access to the chat channels in our discord that connect to these games and these servers, you have to register, for example in the open pub if you want to register for reign of kings you would type* ***!reg rok*** *if you want to register for our Not Safe channels (Completely toxic) you would type* ***!reg nsfw*** *in the open pub.  You can use* ***!help register*** *for a full description of what you can register for*\n__***Thank You For Joining***___\n***We*** *hope you enjoy your experience here in your new community, if you have any questions, or need any assistance ask in the open pub chat which is available under chat channels categories. you can utilize our website at https://www.embersyndicate.com for indirect information about our community, or https://www.embersyndicate.com/support if you have any issues with any of our game servers.*");
    member.sendMessage("__***General Rules***__\n***In*** *game we all accept that we can face each other in battle, and fight each other for the glory of the server, or the faction, or the team. but the golden rule, first and foremost. we get along on discord, we treat each other with respect, issues need to be brought to an officers attention if a mediator is required. DO NOT attempt to escalate an issue between you and another Ember Syndicate member.*\n***We*** *Strive to keep race, religion, politics, and sexism out of our discord, breaking this rule will result in a perm ban, in the NSFW chats we can discuss politics however what happens there stays there. no other exceptions. keep it free from real life issues*\n ***PERIOD!!!!***\n***NO*** *whining about other players killing you or destroying your base or breaking the rules in discord, leave that for the servers, private message server admins directly with issues or submit a support ticket on our website at https://embersyndicate.com/support leave the salt in game this is a community, and we are all capable of respecting each other as a group and as a part of a larger family.****YES*** *get involved in our voice chats get to know us, and become part of our larger family, we are always looking for future developers, admins, and bosses for our groups. Dont ask, make it happen for yourself by jumping in and taking charge!*\n__***Join Our Social Media***__\n***https://www.facebook.com/EmberSyndicate/***  -   ***http://steamcommunity.com/groups/EmberSyndicate***  -  \n***http://discord.embersyndicate.com*** -  ***https://www.reddit.com/r/EmberSyndicate/***  -  \n***https://www.youtube.com/channel/UCiZ8WpxJ0TLvaEwhjgcSa2Q***");
  // Load the guild's settings
  const settings = client.settings.get(member.guild.id);

  // If welcome is off, don't proceed (don't welcome the user)
  if (settings.welcomeEnabled !== "true") return;

  // Replace the placeholders in the welcome message with actual data
  const welcomeMessage = settings.welcomeMessage.replace("{{user}}", member.user.tag);

  // Send the welcome message to the welcome channel
  // There's a place for more configs here.
  member.guild.channels.find("name", settings.welcomeChannel).send(welcomeMessage).catch(console.error);

 /*
 Welcome to Ember Syndicate Network, We welcome you to our discord. Please take a moment to register in our Open Bar chat channel. We host many servers, and have dedicated groups inside large mmo's So Registration is neccisary to keep your discord chat channel clutter down.  If you need help please type   !help register We are happy to have you here from within our network. If you still need support please ask in the Open Bar chat.

I hope you have an amazing time within your new community.
Tallan Fulksayyan, And the entire Ember Syndicate team.
*/ 
};

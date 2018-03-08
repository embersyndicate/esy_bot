// This event executes when a new member joins a server. Let's welcome them!

module.exports = (client, member) => {
  	member.sendMessage("Welcome to Ember Syndicate Network, We welcome you to our discord. Please take a moment to register in our Open Bar chat channel. We host many servers, and have dedicated groups inside large mmo's So Registration is neccisary to keep your discord chat channel clutter down.  If you need help please type   !help register We are happy to have you here from within our network. If you still need support please ask in the Open Bar chat.\n\nI hope you have an amazing time within your new community.\nTallan Fulksayyan, and the entire Ember Syndicate team.");

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

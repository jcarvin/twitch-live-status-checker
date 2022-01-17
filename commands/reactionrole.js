const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "reactionrole",
  description: "Sets up Role Message",

  async run(client, message, args) {
    const channelID = message.mentions.channels.first();
    if (!channelID) return message.reply("Please specify the channel.");

    const desc = args.slice(1).join(" ");
    if (!desc) return message.reply("Please put in a description.");

    const Role1 = message.guild.roles.cache.find(
      (role) => role.name === "yellow"
    );
    const Role2 = message.guild.roles.cache.find(
      (role) => role.name === "purple"
    );

    const emoji1 = "🍋";
    const emoji2 = "🍇";

    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle("The Title")
      .setDescription(desc);

    let msgembed = await channelID.send({ embeds: [embed] });
    await msgembed.react(emoji1);
    await msgembed.react(emoji2);

    //Add Roles on adding a reaction

    client.on("messageReactionAdd", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return console.log("you're a bot silly");
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channelID) {
        if (reaction.emoji.name === emoji1) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(Role1);
        }
        if (reaction.emoji.name === emoji2) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add(Role2);
        }
      } else {
        return console.log("Didn't add a role.");
      }
    });

    //Remove the roles if the remove their reaction.

    client.on("messageReactionRemove", async (reaction, user) => {
      if (reaction.message.partial) await reaction.message.fetch();
      if (reaction.partial) await reaction.fetch();
      if (user.bot) return;
      if (!reaction.message.guild) return;

      if (reaction.message.channel.id == channelID) {
        if (reaction.emoji.name === emoji1) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(Role1);
        }
        if (reaction.emoji.name === emoji2) {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(Role2);
        }
      } else {
        return console.log("Didn't add a role.");
      }
    });
  },
};

const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "wotreactionrole",
  description: "Sets up Reaction Role Message for Wheel of Time",

  async run(client, message, args) {
    const channelID = message.mentions.channels.first();
    if (!channelID) return message.reply("Please specify the channel.");

    channelID.send("@everyone");

    const Role1 = message.guild.roles.cache.find(
      (role) => role.name === "Wheel of Time"
    );

    const emoji1 = "🐲";

    let embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(
        "REACT TO THIS MESSAGE WITH 🐲 TO JOIN THE WHEEL OF TIME WATCH PARTY"
      )
      .setDescription(
        "We're watching Episode 1 at around 7:15pm PST! Which should be just after stream! If anything changes I'll post in the Wheel of Time channel. \n\nReacting will give you the role, removing your reaction will remove the role."
      )
      .setImage(
        "https://images-na.ssl-images-amazon.com/images/S/pv-target-images/27165af5cfef8427827b0ffa54933cfb1e4cf899271220058235b42a300f015d._RI_V_TTW_.jpg"
      );

    let msgembed = await channelID.send({ embeds: [embed] });
    await msgembed.react(emoji1);

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
      } else {
        return console.log("Didn't add a role.");
      }
    });
  },
};

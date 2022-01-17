const { Permissions } = require("discord.js");

module.exports = {
  name: "youtube",
  description: "this bot replies with my youtube url.",
  execute(message, args) {
    if (message.member.roles.cache.has("910348918045425685")) {
      message.channel.send("https://www.youtube.com/pizza_guyttv");
    } else {
      message.channel.send("You don't have the perms. Let me give it to you.");
      message.member.roles.add("910348918045425685").catch(console.error);
    }
    if (message.member.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      console.log("This member can kick");
    }
  },
};

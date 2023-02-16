 var ThanashsK = [];
  client.on('voiceStateUpdate', async (oldMember, newMessage) => {
    const user = await client.users.fetch(newMessage.id);
    const member = newMessage.guild.member(user);

    if (newMessage.channelID === 'Channel ID') {
      await newMessage.guild.channels.create("Donate", {
        type: 'voice',
        parent: newMessage.channel.parentID,
        permissionOverwrites: [
          {
            id: newMessage.guild.roles.cache.get('Role ID Stream'), // Role ID Stream
            allow: ['VIEW_CHANNEL', 'STREAM'],
            deny: ['CONNECT']
          },
          {
            id: newMessage.guild.roles.cache.get('Role Manager'), // Role Manager
            allow: ['VIEW_CHANNEL', 'CONNECT', 'STREAM'],
          },
          {
            id: newMessage.guild.roles.cache.get('Role Donate Manager'), // Role Donate Manager
            allow: ['VIEW_CHANNEL', 'CONNECT', 'STREAM'],
          },
          {
            id: newMessage.guild.roles.everyone,
            deny: ['VIEW_CHANNEL']
          },
        ],

      }).then(async channel => {
        tolias.push({ newID: channel.id, guild: channel.guild });
        await newMessage.setChannel(channel.id)

      });
      
      // Log Channel
      const logchannel = client.channels.cache.get('Channel ID'); // Channel ID
      const embed = new Discord.MessageEmbed()
        .setColor("ff0000")
        .setTimestamp(Date.now())
        .setDescription(`
> ${member} \`joined Waiting for donate\`
> \`Connect to the channel\` ${newMessage.channel}`);

      logchannel.send(`<@&${"role id"}>`, {
        embed: embed,
      });

    }

    if (ThanashsK.length > 0) for (let i = 0; i < ThanashsK.length; i++) {
      let cad = client.channels.cache.get(ThanashsK[i].newID)
      if (cad.members.size === 0) {
        cad.delete().catch(() => []);
        return ThanashsK.splice(i, 1)

      }
    }
  })

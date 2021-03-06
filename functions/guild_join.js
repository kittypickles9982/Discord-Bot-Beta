module.exports = {
	name: 'guild_join',
	execute(guild, client, memDataChk) {
        try {
            const fs = require('fs');

            var serverConfig = `
							{
							  "version": "1",
								"prefix": "~",
								"logEvent": ["MEMBER_JOIN", "MEMBER_LEAVE", "MEMBER_KICKED", "MEMBER_BANNED"],
								"disabledCommands": "",
								"commandChannel": "",
								"MemberCountChannel": "",
								"modChannel": "",
								"bannedWords": ""
							}`;
						var userPrivateConfig = `
							{
								"version": "1",
								"warns": "0",
								"mutes": "0",
								 "kicks": "0"
							 }`;
						//daily times are stored in a Unix timestamp | 43200 is 12 hours
						var userGlobalConfig = `
							{
								"version": "1",
								"cash": "100",
								"dailyTime": "0"
							}`;

						//check if files already exist, would happen if bot has been in server before
            if(!fs.existsSync(`./data/servers/${guild.id}`)) {
              fs.mkdirSync(`./data/servers/${guild.id}`);
						}
						if(!fs.existsSync(`./data/servers/${guild.id}/users`)) {
	          	fs.mkdirSync(`./data/servers/${guild.id}/users`);
						}
						if(!fs.existsSync(`./data/servers/${guild.id}/config.json`)) {
		        	fs.writeFileSync(`./data/servers/${guild.id}/config.json`, serverConfig);
						}
						//log creating user profiles
						console.log(`[SYS] Writing User Profiles for ${guild.memberCount} Users`.brightMagenta);
						//creating user profiles
            guild.members.cache.forEach(member => {
							//check for and make private user profiles
							if(!fs.existsSync(`./data/servers/${guild.id}/users/${member.user.id}.json`)) {
								fs.writeFileSync(`./data/servers/${guild.id}/users/${member.user.id}.json`, userPrivateConfig);
              }
							//check for and make global user profiles
							if(!fs.existsSync(`./data/users/${member.user.id}.json`)){
								fs.writeFileSync(`./data/users/${member.user.id}.json`, userGlobalConfig);
							}
            });
						//log that it's done
						console.log('[SYS] User Profiles Written'.brightMagenta);
						//log entry
            console.log(`[SYS] Files Written For Guild - Name: ${guild.name} | ID: ${guild.id}`.brightMagenta);
        } catch(error) {
            console.log(`[ERROR] Problem Writing Guild Files for ${guild.name}: ${error}`.brightRed.bold);
        }
	}
};

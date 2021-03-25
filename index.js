const dbd = require('dbd.js');
const { env } = require('process');

require('dotenv').config();

const express = require('express');
const app = express();
app.get('/', (request, response) => {
	console.log('Ping recebido!');
	response.sendStatus(200);
});
app.listen(process.env.PORT);

const bot = new dbd.Bot({
	token: process.env.token,
	prefix: 'f-'
});

bot.onMessage();


bot.status({
	text: 'Com $serverCount servidores🌍',
	type: 'WATCHING',
  status: 'dnd',
	time: 12
});
bot.status({
	text: 'Com $allMembersCount membros😁',
	type: 'PLAYING',
  status: 'dnd',
	time: 12
});
bot.status({
	text: '$commandsCount comandos🗂',
	type: 'LISTENING',
  status: 'dnd',
	time: 12
});
bot.status({
	text: 'Meu prefixo f-❗',
	type: 'PLAYING',
  status: 'dnd',
	time: 12
});
bot.status({
	text: 'Suporte https://discord.gg/6ZzvcSPeRY 🌍',
	type: 'PLAYING',
  status: 'dnd',
	time: 12
});

bot.variables({
	dinheiro: '0',
	banco: '0',
	vida: '100',
	premio: '0',
	dbot: '0',
	bvmessage: 'Seja bem vindo ao servidor! Por favor de uma olhada nas regras para não ser banido!',
	lvmessage: 'O usuário saiu do servidor! Espero que volte!',
	entrada: 'null',
	saida: 'null',
	role: '',
	log: '',
	cargo10: '',
	cargo11: ':x: Nenhum',
	cargo20: '',
	cargo22: ':x: Nenhum',
  eu: 'Para definir digite **f-sobremim**',
	celular: '0',
	diamante: '0',
	ouro: '0',
	ferro: '0',
	carvao: '0',
	rch: '',
	rmsg: 'Parabéns {user.mention}🎉, você subiu de level {level}',
	lvl: '0',
	exp: '0',
	rexp: '40',
	rsystem: '0'
});

bot.command({
	name: '$alwaysExecute',
	code: `$useChannel[$getServerVar[rch]]
$replaceText[$replaceText[$replaceText[$replaceText[$getServerVar[rmsg];{user.tag};$userTag];{user.mention};<@$authorID>];{level};$getUserVar[lvl]];{exp};$getUserVar[exp]]
$setUserVar[lvl;$sum[$getUserVar[lvl];1]]
$setUserVar[rexp;$multi[$getUserVar[rexp];2]]
$onlyIf[$getUserVar[exp]>=$getUserVar[rexp];]
`
});

bot.command({
	name: '$alwaysExecute',
	code: `$setUserVar[exp;$sum[$getUserVar[exp];$random[1;4]]]
$onlyIf[$getServerVar[rsystem]>=1;]
$onlyForServers[$guildID;]`
});

bot.botJoinCommand({
	channel: '823350316731858985',
	code: `
$title[FUI ADICIONADO🙂]
$description[
Servidor: $serverName
ID: $guildID
Dono: $username[$ownerID]#$discriminator[$ownerID]
Membros: $membersCount]
$color[#f11308]
$sendDM[$ownerID;{title:OBRIGADO} {description:
Obrigado por me adicionar no seu servidor!
Abaixo eu deixei o servidor de suporte e o site caso precise de ajuda!
[Suporte\\](https://discord.com/invite/6ZzvcSPeRY)
[Site\\](https://felipebot.borth.repl.co/)}{color: #f11308}]
$suppressErrors[]`
});
bot.onGuildJoin();

bot.botLeaveCommand({
	channel: '823350448840638464',
	code: `
$title[FUI REMOVIDO🙁]
$description[
Servidor: $serverName
ID: $guildID
Dono: $username[$ownerID]#$discriminator[$ownerID]
Membros: $membersCount]
$color[#f11308]
$suppressErrors[]`
});
bot.onGuildLeave();

bot.joinCommand({
	channel: '$getServerVar[entrada]',
	code: `
$giveRoles[$authorID;$getServerVar[role]]
$channelSendMessage[$getServerVar[entrada];<@$authorID>{title:BEM VINDO😁} {description:
**Usuário:** $username[$authorID]#$discriminator[$authorID]
**Servidor:** $serverName[$guildID]
$getServerVar[bvmessage]
}{color:#f11308}{thumbnail:$authorAvatar}]
$suppressErrors[]
`
});
bot.onJoined();

bot.leaveCommand({
	channel: '$getServerVar[saida]',
	code: `
$channelSendMessage[$getServerVar[saida];
{title:SAIU😭}
{description:
**Usuário:** $username[$authorID]#$discriminator[$authorID]
**Servidor:** $serverName[$guildID]
$getServerVar[lvmessage]
}{color:#f11308}{thumbnail:$authorAvatar}]
$suppressErrors[]
`
});
bot.onLeave();
bot.deletedCommand({
	channel: '$getServerVar[log]',
	code: `
$author[$username#$discriminator;$authorAvatar]
$title[MENSAGEM APAGADA]
$description[
Canal: <#$channelUsed> 
Mensagem: $message]
$color[#f11308]`
});
bot.onMessageDelete();
bot.updateCommand({
	channel: '$getServerVar[log]',
	code: `
$author[$username#$discriminator;$authorAvatar]
$title[MENSAGEM EDITADA]
$description[
Canal: <#$channelUsed>
Mensagem editada: $oldMessage
Mensagem nova: $message]
$color[#f11308]
`
});
bot.onMessageUpdate();
bot.banAddCommand({
	channel: '$getServerVar[log]',
	code: `$author[$username#$discriminator;$authorAvatar]
$title[BANIMENTO]
$description[
Servidor: $serverName
ID: $guildID]
$color[#f11308]`
});
bot.onBanAdd();
bot.banRemoveCommand({
	channel: '$getServerVar[log]',
	code: `$author[$username#$discriminator;$authorAvatar]
$title[BANIMENTO RETIRADO]
$description[
Servidor: $serverName
ID: $guildID]
$color[#f11308]`
});
bot.onBanRemove();


bot.command({
	name: '<@767515234729590785>',
	nonPrefixed: true,
	code: `
$title[Olá eu sou o FELIPE]
$description[Olá! Meu prefixo é **f-**, para ver meus comandos digite **f-ajuda** ou **f-comandos**.]
$color[#f11308]
`
});

bot.command({
	name: '<@!767515234729590785>',
	nonPrefixed: true,
	code: `
$title[Olá eu sou o FELIPE]
$description[Olá! Meu prefixo é **f-**, para ver meus comandos digite **f-ajuda** ou **f-comandos**.]
$color[#f11308]
`
});

bot.awaitedCommand({
	name: 'awaitReaction1',
	code: ` $editMessage[$message[1];{title:COMANDOS} {description:
**Abaixo estão as categorias!**
← - 🔄 Voltar
1 - 🔨 Moderação
2 - ⚙ Utilidades
3 - <:FEGRANA:804350049982611466> Economia
4 - 🎵 Música
5 - 🔧 Outros
6 - <:AJUDA:804127595033395281> Bot}{color:#f11308}{footer:🔄 - Voltar!}] `
});

bot.awaitedCommand({
	name: 'awaitReaction2',
	code: ` $editMessage[$message[1];{title:🔨 MODERAÇÃO} {description:
f-ban @Usuário Motivo - Banir usuário 
f-kick @Usuário Motivo - Expulsar usuário
f-criarmuted - Cria o cargo de mutado
f-tempmute @Usuário Tempo - Muta o usuário com tempo 
f-mute @Usuário Motivo - Mutar usuário 
f-unmute @Usuário - Desmutar usuário 
f-clear número - Apagar mensagens 
f-lock - Bloqueia o canal
f-unlock - Desbloqueia o canal
f-addrole @Usuário @Cargo - Adicione um cargo para um usuário
f-rmvrole @Usuário @Cargo - Remove um cargo de um usuário 
f-slowmode Tempo - Coloque slowmode no chat
}{color:#f11308}{footer:🔄 - Voltar!}] `
});

bot.awaitedCommand({
	name: 'awaitReaction3',
	code: ` $editMessage[$message[1];{title:⚙  UTILIDADES } {description:
f-link - Gera um link do servidor
f-userinfo - Informações do usuário
f-sobremim Mensagem - Defina você 
f-perfil - Veja seu perfil
f-level - Veja o seu level
f-roleinfo @Cargo - Informações do cargo
f-serverinfo - Mostra as informações do servidor
f-clima Cidade - Veja o clima na cidade
f-avatar @Usuário - Avatar do usuário 
f-icon - Avatar do servidor
f-falar Mensagem - Faz o bot falar
f-karate @Usuário - Para dar um golpe de karatê
f-atacar @Usuário - Para atacar alguém
f-beijar @Usuário - Para beijar alguém 
f-google Pesquisa - Para pesquisar no google
f-trump Mensagem - Trump twitar
f-bolsonaro Mensagem - Bolsonaro assistindo tv
f-ejetar @Usuário- Para ejetar alguém 
f-among Mensagem - O que o impostor tem a falar
f-8ball Pergunta - Pergunte para a bola mágica
f-lutar - Lute
f-curar - Se cure
f-pedra - Jogue pedra
f-papel - Jogue papel
f-tesoura - Jogue tesoura
 }{color:#f11308}{footer:🔄 - Voltar
}] `
});

bot.awaitedCommand({
	name: 'awaitReaction4',
	code: ` $editMessage[$message[1];{title:<:FEGRANA:804350049982611466> ECONOMIA } {description:
f-diario - Colete seu dinheiro diariamente
f-fegrana - Colete o dinheiro do bot
f-trabalhar - Trabalhe para ganhar dinheiro
f-roubar @Usuário - Roube alguém
f-saldo - Veja quanto dinheiro você tem
f-perfil - Veja seu perfil
f-depositar <VALOR> - Dinheiro que você quer depositar no banco
f-sacar <VALOR> - Dinheiro que você quer sacar!
f-pagar @Usuário <VALOR> - Transfira seu dinheiro 
f-mine - Começe a mineração
f-vender-<diamante/ouro/ferro/carvão> VALOR - Vender minérios 
f-loja - Veja a loja
f-fetop - Veja o rank global
f-ecotop - Veja o rank da economia
f-setcargo-<NÚMERO DA COMPRA> @Cargo - Selecionar cargo dado na compra
f-comprar-<NÚMERO DA COMPRA> - Comprar o cargo
f-addmoney @Usuário <VALOR> - Adicionar dinheiro
f-ecoreset - Reseta a economia 
f-resetuser @Usúario - Reseta a economia do usuário}{color:#f11308}{footer:🔄 - Voltar!}] `
});

bot.awaitedCommand({
	name: 'awaitReaction6',
	code: ` $editMessage[$message[1];{title:🔧 OUTROS} {description:
f-sorteio Tempo #Canal Prêmio - Cria um sorteio
f-setrank #Canal - Ativa o level
f-lvlreset - Desativa o level
f-setar @Cargo - Selecionar cargo dado ao entrar
f-setentrada #Canal - Seleciona canal para bem vindo
f-setsaida #Canal - Seleciona o canal de saida
f-setbvmessage Mensagem - Seleciona uma mensagem de bem vindo
f-setlvmessage Mensagem - Seleciona uma mensagem de saída 
f-setlog - Seleciona o canal de logs 
f-modreset - Reseta a moderação
}{color:#f11308}{footer:🔄 - Voltar!}] `
});

bot.awaitedCommand({
	name: 'awaitReaction7',
	code: ` $editMessage[$message[1];{title:🎵 MÚSICA} {description:
f-play Música - Começa a tocar uma música
f-song - Informações da música
f-stop - Para a música
f-pause - Pausa a música
f-resume - Retorna a música
f-volume Volume - Muda o volume
}{color:#f11308}{footer:🔄 - Voltar!}] `
});

bot.awaitedCommand({
	name: 'awaitReaction8',
	code: ` $editMessage[$message[1];{title:<:AJUDA:804127595033395281>BOT} {description:
f-botinfo - Veja as informações do bot
f-convite - Adicione o bot no seu servidor
f-feedback - De seu feedback
f-ajuda - Veja o painel de ajuda
f-comandos - Veja os comandos do bot
f-commandinfo Nome - Veja as informações dos comandos
}{color:#f11308}{footer:🔄 - Voltar!}] `
});

bot.awaitedCommand({
	name: 'awaitReaction10',
	code: ` $editMessage[$message[1];{title:📃 INFORMAÇÕES DO USUÁRIO} {description:
Nome:
$username[$mentioned[1;yes]]

📱ID:
$mentioned[1;yes]

📱DISCRIMIMATOR:
$discriminator[$mentioned[1;yes]]

🗓Criado em:
$creationDate[$mentioned[1;yes];time]

🎓Maior cargo:
<@&$highestRole[$mentioned[1;yes]]>

}{color:#f11308}{thumbnail: $userAvatar[$mentioned[1;yes]]}{footer:🎓 Permissões}] `
});

bot.awaitedCommand({
	name: 'awaitReaction11',
	code: ` $editMessage[$message[1];{title:🎓 PERMISSÕES} {description:
**🎓Perms:**
$userPerms[$mentioned[1;yes]]
**🎓Cargos:**
$userRoles[$mentioned[1;yes]]
}{color:#f11308}{thumbnail:$userAvatar[$mentioned[1;yes]]}{footer:🔄 Voltar}] `
});

const fs = require('fs');

const folders = fs.readdirSync('./commands/');

for (const files of folders) {
	const folder = fs
		.readdirSync(`./commands/${files}/`)
		.filter(file => file.endsWith('.js'));

	for (const commands of folder) {
		const command = require(`./commands/${files}/${commands}`);
		bot.command({
			name: command.name,
			aliases: command.aliases,
			description: command.description,
			code: command.code
		});
	}
}

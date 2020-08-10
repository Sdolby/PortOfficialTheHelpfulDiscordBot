const prefix = '!';
const Discord = require( 'discord.js' );
var GetJSONHelp = require('./gethelp.json');
const RandomSetPriceResponses = new Array();

function getRandomInt( max )
{
	return Math.floor( Math.random() * Math.floor( max ) );
}

function FunctionGetResponses( SenderName )
{
	RandomSetPriceResponses.push( "Seems overpriced, must be a reseller" );
	RandomSetPriceResponses.push( SenderName +		" lowballing again? It's always you! " );
	RandomSetPriceResponses.push( SenderName +		"? ah, of course you would know, you never leave Seville" );
	RandomSetPriceResponses.push( "GONK" );
	RandomSetPriceResponses.push( "CHONK" );
	RandomSetPriceResponses.push( "YEET" );
	return ( RandomSetPriceResponses[ getRandomInt( RandomSetPriceResponses.length ) ] );
}
const url = "mongodb://localhost:27017/";
const util = require( 'util' )
// create the Discord client
const client = new Discord.Client();

// When the app is ready it will write out Ready using this
client.once( 'ready', () =>
{
	console.log( 'Ready!' );
} );
var MongoClient = require( 'mongodb' ).MongoClient;
var object = {
	"ItemName": new Array(),
	"ItemValue": new Array(),
	"ItemForm": new Array()
}
var GetItemPrices = {

	"ItemName" : new Array()
}

const GetHelp = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Help!')
	.setDescription('How to use this bot')
	.setThumbnail('https://cdn3.iconfinder.com/data/icons/user-interface-5-1/32/219-512.png')
	.addFields(
			{ name: 'Command', value: GetJSONHelp.getcommand.command, inline: true},
			{ name: 'Command Description', value: GetJSONHelp.getcommand.description, inline: true},
		  )
	.setTimestamp()

var GetAllPrices = new Discord.MessageEmbed()

function CreateGetPricesEmbed( ServerName )
{
	GetAllPrices.setColor( '#0099ff' )
	GetAllPrices.setTitle( 'PRICE CHECK' )
	GetAllPrices.setDescription( 'PRICES ARE AS BELOW(In Alphabetical Order)' )
	GetAllPrices.setThumbnail( 'https://i.imgur.com/HsGMkNq.png' )
	GetAllPrices.addFields(
		//var query = { address: "Park Lane 38" };
		{
			name: 'Item',
			value: object.ItemName,
			inline: true
		},
		{
			name: 'Value',
			value: object.ItemValue,
			inline: true
		},{
			name: 'Form',
			value: object.ItemForm,
			inline: true
		}, )
	GetAllPrices.setTimestamp();
}
client.on( 'message', message =>
		{
			if ( !message.content.startsWith( prefix ) || message.author.bot ) return;
			const args = message.content.slice( prefix.length ).trim().split( / +/ );
			const command = args.shift().toLowerCase();
			switch ( command )
			{
				case 'help':
						message.channel.send(GetHelp);
						
				break;
				case 'install':
					var dbc = url + message.guild.id;
					MongoClient.connect( dbc, function( err, db )
					{
						if ( err ) throw err;
						//console.log("Database created!");
						db.close();
					} );
					MongoClient.connect( url, function( err, db )
					{
						if ( err ) throw err;
						var dbo = db.db( message.guild.id );
						dbo.createCollection( "PriceChecker", function( err, res )
						{
							if ( err ) throw err;
							console.log( "Table: PriceChecker created" );
							db.close();
						} );
					} );
					message.channel.send("Database Created");
					break;
				case 'setprice':
				
					//Checks if the requester is in the 
					if ( message.member.roles.cache.some( r => r.name == "PriceChecker" ) )
						
							{
								var dbc = url + message.guild.id;
								MongoClient.connect( dbc, function( err, db )
								{
									if ( err ) throw err;
									var dbo = db.db( message.guild.id );


								dbo.collection("PriceChecker").findOne({'Item': args[0], 'Form':args[2]},function(err,doc){
									//Checks collection for this info, not only against item name but the form it is in.
									//this is so that we can have seperate price values without causing any confusion.

									if( doc == null ) {
									var FormArgue=args[2];
									if(args[2] == null)
									{
										FormArgue=" ";
									}
								//The object we write to the database
								var myobj = {
									Item: args[ 0 ],
									Value: args[ 1 ],
									Form: FormArgue
							}
										// do whatever you need to do if it's not there
										dbo.collection( "PriceChecker" ).insertOne( myobj, function( err,res )
								{
									console.log("Gonk");
	
										if ( err ) throw err;
										console.log( "Price Check Set" );
										var RandomResponse = FunctionGetResponses( message.member.displayName );
										message.channel.send( RandomResponse );
									db.close();
										});
								
									} 
									else{

												message.channel.send(args[0] + " already exists in that form please use !updateitem instead");

																		}		
									
										


									
									db.close();




								});
							});

		
						


						
							
								
								//db.documentExistsOrNotDemo.find({"UserId":101}).count() > 0;
								//if (dbo.collection("PriceChecker").countDocuments.find({"Item": args[0]}) )
								
								
								
								
							
								
							
					
					
			
						}
						else
						{
							message.channel.send( message.member.displayName +" you don't have permissions to add prices please message @PriceChecker to update");
						}
					
						break;
						case 'updateprice':
							if ( message.member.roles.cache.some( r => r.name == "PriceChecker" ) )
							{


								var dbc = url + message.guild.id;
								MongoClient.connect( dbc, function( err, db )
								{
									if ( err ) throw err;
									var dbo = db.db( message.guild.id );
									
								dbo.collection("PriceChecker").findOne({'Item': args[0]},function(err,doc){
									if( doc == null ) {
											
										message.channel.send(args[0] + " doesn't exisit in the database, please use !setprice "+ args[0] + " " + args[1] + " to add");

									}
										else {
											var myquery = {
												Item: args[ 0 ]
											};
											var newvalues = {
												$set:
												{
													Item: args[ 0 ],
													Value: args[ 1 ]
																									}
											};
											dbo.collection( "PriceChecker" ).updateOne( myquery, newvalues,
												function( err, res )
												{
													if ( err ) throw err;
													console.log( "1 document updated" );
													db.close();
												} );

										}
								
								} );
							});	
							}
							else
							{
								message.channel.send( message.member.displayName +
									" you don't have permissions to update prices please message @PriceChecker to update"
								);
							}
							break;
						case 'pricecheck':



							var dbc = url + message.guild.id;
							MongoClient.connect( dbc, function( err, db )
							{
								if ( err ) throw err;
								var dbo = db.db( message.guild.id );
								
							dbo.collection("PriceChecker").findOne({'Item': args[0]},{projection:{_id: 0,Item: 1, Value:1}
							},function(err,doc){
								if( doc == null ) {
										
									message.channel.send(args[0] + " doesn't exisit in the database, please use !setprice to add");

								}
								else {

									message.channel.send(doc.Item + " is worth " + doc.Value);

								}
							
							} );
							
						});	

						break;
						
						case 'listprices':
							object.ItemValue = new Array();
							object.ItemName = new Array();
							object.ItemForm = new Array();
							var arraytestItem = new Array();
							var arraytestValue = new Array();
							var dbc = url + message.guild.id;
							MongoClient.connect( dbc, function( err, db )
							{
								if ( err ) throw err;
								var dbo = db.db( message.guild.id );
								var mysort = { Item: 1 };
								dbo.collection( "PriceChecker" ).find(
								{},
								{
									projection:
									{
										_id: 0,
										Item: 1,
										Value: 1,
										Form:1
									}
								} ).sort(mysort).toArray( function( err, result )
								{
									if ( err ) throw err;
									var i = 0;
									var len = result.length;
									for ( ; i < len; i++ )
									{
										object.ItemName.push( result[ i ].Item );
										object.ItemValue.push( result[ i ].Value );
										object.ItemForm.push( result[ i ].Form );
									}
									CreateGetPricesEmbed( message.guild.id );
									message.channel.send( GetAllPrices );
									GetAllPrices = new Discord.MessageEmbed();
									db.close();
								} );
								
							} );
							break;
					}
			} ); client.login('INSERT KEY HERE' );

const prefix = '!!';
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
	.setDescription('How to use this bot\n Any questions please pm @PortOfficialDevelopment')
	.setThumbnail('https://cdn3.iconfinder.com/data/icons/user-interface-5-1/32/219-512.png')
	.addFields(
			{ name: 'Command', value: GetJSONHelp.getcommand.command, inline: true},
			{ name: 'Command Description', value: GetJSONHelp.getcommand.description, inline: true},
			{ name: 'Command usage', value: GetJSONHelp.getcommand.usage, inline: true }		  )
	.setTimestamp()

var GetAllPrices = new Discord.MessageEmbed()
var PriceCheckObject = {
	"ItemName": new Array(),
	"ItemValue": new Array(),
	"ItemForm": new Array()
}
var GetPriceCheck = new Discord.MessageEmbed()
function CreatePriceCheckEmbed(ServerName)
{
	GetPriceCheck.setColor( '#0099ff' )
	GetPriceCheck.setTitle( 'PRICE CHECK' )
	GetPriceCheck.setDescription( 'PRICES ARE AS BELOW(In Alphabetical Order)' )
	GetPriceCheck.setThumbnail( 'https://i.imgur.com/HsGMkNq.png' )
	GetPriceCheck.addFields(
		//var query = { address: "Park Lane 38" };
		{
			name: 'Item',
			value: PriceCheckObject.ItemName,
			inline: true
		},
		{
			name: 'Value',
			value: PriceCheckObject.ItemValue,
			inline: true
		},{
			name: 'Form',
			value: PriceCheckObject.ItemForm,
			inline: true
		}, )
	GetPriceCheck.setTimestamp();
}


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
		},	
		
		)
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
					if (message.channel.name == "pc-auto-test"){
						message.channel.send(GetHelp);
					}			else{
						message.channel.send("Please go to @pc-auto-test");

					}
				break;
				case 'install':
					if (message.channel.name == "pc-auto-test"){
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
				}			else{
					message.channel.send("Please go to @pc-auto-test");
node
				}
					break;
				
				case 'setprice':
					if (message.channel.name == "pc-auto-test"){
					//Checks if the requester is in the 
					if ( message.member.roles.cache.some( r => r.name == "PriceChecker" ) )
						if (args[2]== null)
						{

							message.channel.send("Missing a parameter, please make sure to include the category of the item")

						}
						else{
							{
								var dbc = url + message.guild.id;
								MongoClient.connect( dbc, function( err, db )
								{
									if ( err ) throw err;
									var dbo = db.db( message.guild.id );
									var ItemName = args[0].toLowerCase();
									var FormArgue;
									
									if(args[3] == null)
										{
											args[3] = "n/a"
											FormArgue="n/a";
											
										}
									else{


										 FormArgue= args[3].toLowerCase();
									}
									dbo.collection("PriceChecker").findOne({'Item': ItemName, 'Form':FormArgue},function(err,doc){
										//Checks collection for this info, not only against item name but the form it is in.
										//this is so that we can have seperate price values without causing any confusion.
										
										console.log(args[3]);
										console.log(FormArgue);
										console.log(ItemName);
										console.log(doc);
										
										if( doc == null ) {
										
									
									//The object we write to the database
									var myobj = {
										Item: args[ 0 ].toLowerCase(),
										Value: args[ 1 ].toLowerCase(),
										Category: args[2].toLowerCase(),
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

		
							}


						
							
								
								//db.documentExistsOrNotDemo.find({"UserId":101}).count() > 0;
								//if (dbo.collection("PriceChecker").countDocuments.find({"Item": args[0]}) )
								
								
								
								
							
								
							
					
					
			
						}
						else
						{
							message.channel.send( message.member.displayName +" you don't have permissions to add prices please message @PriceChecker to update");
						}
					}			else{
						message.channel.send("Please go to @pc-auto-test");

					}
						break;
						
						case 'updateprice':
							//if (message.channel.name == "pc-auto-test"){
								var FormValue = "";
							if (message.channel.name == "pc-auto-test"){
							if ( message.member.roles.cache.some( r => r.name == "PriceChecker" ) )
							{
							if (args[1] == null)
							{
								message.channel.send("Missing parameters, please make sure the format is !!update Item DucatValue Form");

							}
							else{
								var FormValue = "";
							if(args[2] == null)
							{

								//message.channel.send("Missing either Item Name, Value or Form ")
								FormValue = "n/a"
							}
							else{

								FormValue = args[2].toLowerCase();
							}
							
								var dbc = url + message.guild.id;
								MongoClient.connect( dbc, function( err, db )
								{
									if ( err ) throw err;
									var dbo = db.db( message.guild.id );
									
								dbo.collection("PriceChecker").findOne({'Item': args[0].toLowerCase(), 'Form': FormValue},function(err,doc){
									if( doc == null ) {
											
										message.channel.send(args[0] + " in that form doesn't exisit in the database, please use !setprice "+ args[0] + " " + args[1] + " to add");

									}
										else {
											var myquery = {
												Item: args[ 0 ].toLowerCase(),
												Form: FormValue
											};
											var newvalues = {
												$set:
												{
													Item: args[ 0 ].toLowerCase(),
													Form:FormValue,
													Value: args[ 1 ]
																									}
											};
											dbo.collection( "PriceChecker" ).updateOne( myquery, newvalues,
												function( err, res )
												{
													if ( err ) throw err;
													console.log( "1 document updated" );
													message.channel.send(args[0]+ " has been successfully updated");
													db.close();
												} );

										}
								
								} );
							});	
							
						}
					}
							else
							{
								message.channel.send( message.member.displayName +
									" you don't have permissions to update prices please message @PriceChecker to update"
								);
							}
							
						}
						else{
							message.channel.send("Please go to @pc-auto-test");

						}
							break;

						case 'listcategory':

							if (message.channel.name == "pc-auto-test"){


								
								var dbc = url + message.guild.id;
								MongoClient.connect( dbc, function( err, db )
								{
									if ( err ) throw err;
									var dbo = db.db( message.guild.id );
									var mysort = { Item: 1 };
										message.channel.send("The following are valid categories:")
										dbo.collection( "PriceChecker" ).distinct( "Category",{}, (function(err, docs)
										{
										if(err){
											return console.log(err);
										}
										if(docs){  
											message.channel.send(docs);
										}
									})
										);
								});
							}
							else{
								message.channel.send("Please go to @pc-auto-test");
	
							}

						break;

						case 'pricecheck':

							if (message.channel.name == "pc-auto-test"){

								
								PriceCheckObject.ItemValue = new Array();
								PriceCheckObject.ItemName = new Array();
								PriceCheckObject.ItemForm = new Array();
							var dbc = url + message.guild.id;
							MongoClient.connect( dbc, function( err, db )
							{
								if ( err ) throw err;
								var dbo = db.db( message.guild.id );
								var FormValue = "";
								if(args[1] == null)
								{
	
									//message.channel.send("Missing either Item Name, Value or Form ")
									FormValue = "n/a"
								}
								else{
	
									FormValue = args[1].toLowerCase();
								}
								
								dbo.collection( "PriceChecker" ).find({Item:args[0].toLowerCase()},{projection:{_id: 0,	Item: 1,Value: 1,Form:1}} ).toArray( function( err, result )
					
								{
								if (!result.length) {
									message.channel.send("Item Doesn't exist in database pls add");

								}
								else
								{
										
											
										var i = 0;
										var len = result.length;
										for ( ; i < len; i++ )
										{
											PriceCheckObject.ItemName.push( result[i].Item.toUpperCase() );
											PriceCheckObject.ItemValue.push( result[i].Value.toUpperCase() );
											PriceCheckObject.ItemForm.push( result[i].Form.toUpperCase() );
										
										}
										CreatePriceCheckEmbed( message.guild.id );
										message.channel.send( GetPriceCheck );
										GetPriceCheck  = new Discord.MessageEmbed();
										db.close();
									
									
									
									}
									}); 
									
								});
							
							
							
							
						
					}			else{
						message.channel.send("Please go to @pc-auto-test");

					}





						break;
						
						case 'listprices':
							if (message.channel.name == "pc-auto-test"){
														if (args[0]== null){


																var dbc = url + message.guild.id;
						MongoClient.connect( dbc, function( err, db )
						{
							if ( err ) throw err;
							var dbo = db.db( message.guild.id );
							var mysort = { Item: 1 };
								message.channel.send("Please type in a Category !listprices CATEGORY")
								message.channel.send("Valid Categories are as below");
								dbo.collection( "PriceChecker" ).distinct( "Category",{}, (function(err, docs)
								{
								if(err){
									return console.log(err);
								}
								if(docs){  
									message.channel.send(docs);
								}
							})
								);
						});

							}else {
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
//CHECK IF VALID Category

dbo.collection("PriceChecker").findOne({Category: args[0].toLowerCase()},function(err,doc){
//Checks collection for this info, not only against item name but the form it is in.
//this is so that we can have seperate price values without causing any confusion.

if (doc== null){

	message.channel.send("No Category exists within the database");
	message.channel.send("Valid Categories are as below");

	dbo.collection("pricecheckker")


	dbo.collection( "PriceChecker" ).distinct( "Category",{}, (function(err, docs)
	{
	if(err){
		return console.log(err);
	}
	if(docs){  
		message.channel.send(docs);
	}
})
);


}else{

dbo.collection( "PriceChecker" ).find({Category:args[0].toLowerCase()},{projection:{_id: 0,	Item: 1,Value: 1,Form:1,Category:1}} ).sort(mysort).toArray( function( err, result )
					
{
if ( err ) throw err;
		
			
		var i = 0;
		var len = result.length;
		for ( ; i < len; i++ )
		{
			object.ItemName.push( result[i].Item.toUpperCase() );
			object.ItemValue.push( result[i].Value.toUpperCase() );
			object.ItemForm.push( result[i].Form.toUpperCase() );
		
		}
		CreateGetPricesEmbed( message.guild.id );
		message.channel.send( GetAllPrices );
		GetAllPrices = new Discord.MessageEmbed();
		db.close();
	
	
		
	}); 
}
});
});

}
						}		
								
						break;
						case 'delete':


						break;

						case 'rename':


						break;




					}
			} );client.login('INSERT KEY HERE' );

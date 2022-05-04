const socketToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IjZBQkFDODM1NEZFMjVCOTUxQkZCIiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiNzExOTYwMjQzIn0.GYjFRUaMuG2f9rcvI7uztYlFT-0X8Q3peYhQtJ8IIvQ'; //Socket token from /socket/token end point
const FakeYouURL = 'https://api.fakeyou.com/tts/inference'
const io  = require('socket.io-client');
const { randomUUID } = require("crypto");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { createWriteStream } = require("fs");
const { randomBytes } = require("crypto");
const { pipeline } = require("stream");
const { promisify } = require("util");
const { unlink } = require("fs");
var voice = 'TM:7wbtjphx8h8v';
const { requestSpeech, getVoiceList } = require("C:\\Users\\lolt0\\Desktop\\Streamlabs test project\\fakeYou.js");
const { fakeYouToken } = 'SAPI:FTK789_6096133E1D79D6FB'
 
  const streamlabs = io(`https://sockets.streamlabs.com?token=${socketToken}`, {transports: ['websocket']});
 
  console.log('Fetching')
  
  streamlabs.on('connect', () => { console.log('Connection To Server Successful...');});
  streamlabs.on('event', eventData => {
    if(eventData.for === 'twitch_account' && eventData.type == 'follow'){
      console.log('New follower:');
      var followobj = eventData.message;
      var followname = followobj[0].name;
      console.log(followname);
      console.log(followobj);
      console.log('hi');
     
    }
	if(eventData.for === 'twitch_account' && eventData.type == 'subscription'){
		var donobj = eventData.message;
		var dononame = donobj[0].name;
		var donoamo = donobj[0].amount;
		var donomessage = donobj[0].message;
		var message = donomessage;
		console.log(message);
		console.log(voice)
		function requestSpeechFile(voice, message) {
			return new Promise(async(resolve, reject) => {
				// Launch speech request and poll until completion
				const url = await requestSpeech(voice, message).catch(reject);
				if (!url) return;
				const response = await fetch(url).catch(error => {
					reject(`HTTP error! ${error.name}`);
					console.error(error);
				});
				if (!response.ok) return;
		
				// Generate random temporary filename to avoid overwriting other recordings
				const filePath = `./${randomBytes(48).toString("hex")}.wav`;
		
				const streamPipeline = promisify(pipeline);
				await streamPipeline(response.body, createWriteStream(filePath)).then(() => {
		
					resolve(filePath);
				}).catch(error => {
					if (!error) return;
					reject("Failed to write file!");
					console.error(error);
				});
			});
		}
		
		
		
				requestSpeechFile(voice, message).then(async(filePath) => {
		console.log('its working')
					// Send temporary file in new message to avoid 15 minute interaction expiry time
					}).catch(console.error);

	}
    if(eventData.for === 'streamlabs' && eventData.type == 'donation'){
      var donobj = eventData.message;
      var dononame = donobj[0].name;
      var donoamo = donobj[0].amount;
      var donomessage = donobj[0].message;
	  var message = donomessage;
      console.log(message);
	  console.log(voice)
	
function requestSpeechFile(voice, message) {
	return new Promise(async(resolve, reject) => {
		// Launch speech request and poll until completion
		const url = await requestSpeech(voice, message).catch(reject);
		if (!url) return;
		const response = await fetch(url).catch(error => {
			reject(`HTTP error! ${error.name}`);
			console.error(error);
		});
		if (!response.ok) return;

		// Generate random temporary filename to avoid overwriting other recordings
		const filePath = `./${randomBytes(48).toString("hex")}.wav`;
		console.log('tesdting')

		const streamPipeline = promisify(pipeline);
		await streamPipeline(response.body, createWriteStream(filePath)).then(() => {

			resolve(filePath);
		}).catch(error => {
			if (!error) return;
			reject("Failed to write file!");
			console.error(error);
		});
	});
}



		requestSpeechFile(voice, message).then(async(filePath) => {
console.log('its working?')
			// Send temporary file in new message to avoid 15 minute interaction expiry time
		  console.log('hi')
			}).catch(console.error);
			
		
};
	
});

    

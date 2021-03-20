const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
     this.position = position;
     this.mode = mode;
     this.generatorWatts = generatorWatts;
   }
   receiveMessage(message){
     let results = [];
     for (let i = 0; i < message.commands.length; i++){
       if (message.commands[i].commandType === 'STATUS_CHECK'){
         results.push({completed: true, roverStatus: {
           position: this.position,
           mode: this.mode,
           generatorWatts: this.generatorWatts}});
       }
       if (message.commands[i].commandType === 'MOVE'){
         if (this.mode === 'NORMAL') {
         this.position = message.commands[i].value;
         results.push({completed: true});
         } else {
           results.push({completed: false});
         }
       }
       if (message.commands[i].commandType === 'MODE_CHANGE'){
         this.mode = message.commands[i].value;
         results.push({completed: true});
       }
     }
     let response = {
           message: message.name,
           results: results
         };
     return response;
   }
}


module.exports = Rover;


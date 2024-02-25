class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let { name, commands } = message;
      let results = [];

// Loop through each command in the message
   for (let command of commands) {
// Handle different command types
   switch (command.commandType) {
   case 'MOVE':
   // Check if the rover is in LOW_POWER mode
   if (this.mode === 'LOW_POWER') {
      // If in LOW_POWER mode, the command is not completed
      results.push({ completed: false });
   } else {
      // If in NORMAL mode, update rover's position and mark the command as completed
      this.position = command.value;
      results.push({ completed: true });
   }
   break;

   case 'STATUS_CHECK':
   // Return the current status of the rover
   results.push({ completed: true, roverStatus: {
         mode: this.mode,
         generatorWatts: this.generatorWatts,
         position: this.position
      }
   });
   break;

   case 'MODE_CHANGE':
      // Change the rover's mode to the specified mode
      this.mode = command.value;
      // Mark the command as completed
      results.push({ completed: true });
      break;

   default:
      // If the command type is unknown, mark the command as not completed
      results.push({ completed: false });
   }
}
// Return an object containing the name of the message and the results of executing the commands
return { message: name, results };
   }
}

module.exports = Rover;
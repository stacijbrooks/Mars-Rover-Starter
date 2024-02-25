const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() { //test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
      // Create a new Rover instance with position "number"
    let rover = new Rover(500);
    //Verify that the constructor sets the position to 500
      expect(rover.position).toEqual(500);
      // Verify that the constructor sets the mode to 'NORMAL'
      expect(rover.mode).toEqual('NORMAL');
       // Verify that the constructor sets the default value for generatorWatts to 110
      expect(rover.generatorWatts).toEqual(110);
  });
  //test 8
  it("response returned by receiveMessage contains the name of the message", function() {
      let rover = new Rover(500); //set a new Rover with initial position
      let commands = []; // Commands array
      let message = new Message("Testing, testing, 1,2,3", commands); //Create a new Message instance with a name and commands
      // Call the receiveMessage method with the message
      let response = rover.receiveMessage(message);
      // Verify that the response contains the name of the message
        expect(response.message).toEqual("Testing, testing, 1,2,3");
  });
//test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(500);
    let commands = [
      new Command('MOVE', 100), 
      new Command('STATUS_CHECK'), //TWO COMMANDS SENT IN MSG
  ];
  let message = new Message("Mars, can you hear me?", commands); //new Message instance with a name and commands
 // Call the receiveMessage method with the message
  let response = rover.receiveMessage(message); 
  // Verify that the response contains two results
    expect(response.results.length).toEqual(2);
  });
//test 10
  it("responds correctly to the status check command", function() {
  // Create a new Rover instance with an initial position
    const rover = new Rover(500); 
    // Create a STATUS_CHECK command
    const statusCheckCommand = new Command('STATUS_CHECK');
    // Create a message with the STATUS_CHECK command
    const message = new Message("Rover, please report your status", [statusCheckCommand]);
    // Call the receiveMessage method with the message
    const response = rover.receiveMessage(message);
    // Verify that the response contains one result
    expect(response.results.length).toEqual(1);
    // Verify that the result indicates completion
    expect(response.results[0].completed).toEqual(true);
    // Verify that the roverStatus object is included in the result
    expect(response.results[0].roverStatus).toEqual({
        mode: 'NORMAL', // Verify that the mode is 'NORMAL'
        generatorWatts: 110, // Verify that the generatorWatts is 110
        position: 500 // Verify that the position matches the initial position of the rover
    });
  });
//test 11
  it("responds correctly to the mode change command", function() {
    // Create a new Rover instance with an initial position
    let rover = new Rover(500); 
    // Create a MODE_CHANGE command with a mode of 'LOW_POWER'
    let modeChangeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
    // Create a message with the MODE_CHANGE command
    let message = new Message("Rover, switch to low power Mode", [modeChangeCommand]);
    // Call the receiveMessage method with the message
    let response = rover.receiveMessage(message);
    // Verify that the response contains one result
    expect(response.results.length).toEqual(1);
    // Verify that the result indicates completion
    expect(response.results[0].completed).toEqual(true);
    // Verify that the rover's mode is updated to 'LOW_POWER'
    expect(rover.mode).toEqual('LOW_POWER');
  });
//test 12
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    // Create a new Rover instance with an initial position
    let rover = new Rover(500); 
    // Set the rover's mode to LOW_POWER
    rover.mode = 'LOW_POWER';
    // Create a MOVE command
    let moveCommand = new Command('MOVE', 100);
    // Create a message with the MOVE command
    let message = new Message("Move Message", [moveCommand]);
    // Call the receiveMessage method with the message
    let response = rover.receiveMessage(message);
    // Verify that the response contains one result
    expect(response.results.length).toBe(1);
    // Verify that the result indicates incomplete (completed = false)
    expect(response.results[0].completed).toBe(false);
    // Verify that the rover's position remains unchanged
    expect(rover.position).toBe(500);
  });
//test 13
  it("responds with the position for the move command", function() {
    // Create a new Rover instance with an initial position
    let rover = new Rover(500); 
    // Create a MOVE command with a new position
    let moveCommand = new Command('MOVE', 600);
    // Create a message with the MOVE command
    let message = new Message("Move to position 600", [moveCommand]);
    // Call the receiveMessage method with the message
    let response = rover.receiveMessage(message);
    // Verify that the response contains one result
    expect(response.results.length).toEqual(1);
    // Verify that the result indicates completion
    expect(response.results[0].completed).toEqual(true);
    // Verify that the rover's position is updated to the new position
    expect(rover.position).toEqual(600);
  });
});

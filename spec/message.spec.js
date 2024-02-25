const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Message class", function() {
    // ensures that an error is thrown if the name parameter is not provided when creating a Message object.
    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect(function() { new Message(); }).toThrow(new Error('Name required'));
    });
    //verifies that the name property of a Message object is set correctly when a name is provided.
    it("constructor sets name", function() {
        let message = new Message('Meredith');
        expect(message.name).toEqual('Meredith');
    });
    //checks whether the commands property of a Message object is correctly set with the array of commands passed into the constructor.
    it("contains a commands array passed into the constructor as the 2nd argument", function() {
        let commands = [
            new Command('MOVE', 100),
            new Command('STATUS_CHECK')
        ];
        let message = new Message("Let's Go!", commands);
        expect(message.commands).toEqual(commands);
    });
});
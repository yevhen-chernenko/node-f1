// node modules
const readline = require("readline");
const EventEmitter = require("events");

// custom modules
const F1Race = require("./f1-race");

// Create the readline interface for user input/output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Create the global event emitter instance
const raceEmitter = new EventEmitter();

// Initialize the race and pass the event emitter
const race = new F1Race(raceEmitter);

// Prompt the user to start the race
rl.question(
  'Welcome to the A Node.JS Formula One Simulator! Type "go" to start the race: ',
  (answer) => {
    if (answer.toLowerCase() === "go") {
      race.startRace();
    } else {
      console.log("Invalid command. Exiting...");
      rl.close();
    }
  }
);

// Listen for custom events from the race
raceEmitter.on("raceStarted", () => {
  console.log("The race has begun!");
});

raceEmitter.on("raceFinished", (winner) => {
  console.log(`🏁 Race finished! The winner is ${winner}! 🏁`);
  rl.close();
});

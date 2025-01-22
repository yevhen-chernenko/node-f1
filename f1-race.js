const F1Events = require("./f1-events");

class F1Race {
  constructor(eventEmitter) {
    this.eventEmitter = eventEmitter;
    this.raceMinDuration = 10000;
    this.raceMaxDuration = 30000;
    this.randomEventInterval = 2000;
    this.drivers = [
      "Lewis Hamilton",
      "Max Verstappen",
      "Charles Leclerc",
      "George Russell",
      "Fernando Alonso",
      "Carlos Sainz",
      "Lando Norris",
      "Sergio Perez",
      "Oscar Piastri",
      "Valtteri Bottas",
      "Esteban Ocon",
      "Pierre Gasly",
      "Lance Stroll",
      "Kevin Magnussen",
      "Nico Hulkenberg",
      "Alexander Albon",
      "Yuki Tsunoda",
      "Logan Sargeant",
      "Zhou Guanyu",
      "Mick Schumacher",
      "Daniel Ricciardo",
      "Sebastian Vettel",
      "Kimi Raikkonen",
      "Jenson Button",
      "Felipe Massa",
      "Nico Rosberg",
      "Robert Kubica",
      "Rubens Barrichello",
      "David Coulthard",
      "Jacques Villeneuve",
    ];
  }

  getRandomDriverName(excludeDriver = null) {
    // Get a random driver, optionally excluding a specific driver
    const eligibleDrivers = this.drivers.filter(
      (driver) => driver !== excludeDriver
    );
    return eligibleDrivers[Math.floor(Math.random() * eligibleDrivers.length)];
  }

  generateRandomEvent() {
    const firstDriver = this.getRandomDriverName();
    const secondDriver = this.getRandomDriverName(firstDriver);

    const randomEvent = [
      `There was a crash involving ${firstDriver}!`,
      `It's raining!`,
      `Safety car deployed!`,
      `Virtual safety car deployed!`,
      `${firstDriver} sets the fastest lap!`,
      `${firstDriver} overtakes ${secondDriver} for the lead!`,
      `${firstDriver} retires from the race due to a mechanical failure!`,
      `Red flag! The session is stopped.`,
      `${firstDriver} receives a time penalty!`,
      `${firstDriver} pits for fresh tires.`,
      `${firstDriver} reports an issue with their car.`,
      `A team radio reveals frustration from ${firstDriver}.`,
      `Track limits warning for ${firstDriver}.`,
      `Yellow flags in Sector ${Math.floor(Math.random() * 18) + 1}!`,
      `${firstDriver} is defending hard against ${secondDriver}!`,
      `The stewards are investigating an incident involving ${firstDriver} and ${secondDriver}.`,
      `${firstDriver} makes an incredible double overtake!`,
      `Pit lane entry is temporarily closed.`,
      `${firstDriver} locks up and goes wide!`,
      `${firstDriver} spins off the track!`,
      `DRS is enabled!`,
      `Red flag due to debris on the track.`,
      `${firstDriver} gets a brilliant start off the line!`,
      `${firstDriver} is on an alternate strategy and climbing the order!`,
      `A sudden power unit issue for ${firstDriver}!`,
      `A bold move from ${firstDriver} stuns the crowd!`,
      `${firstDriver} receives a black-and-orange flag.`,
      `${firstDriver} is crowned Driver of the Day!`,
    ];

    return randomEvent[Math.floor(Math.random() * randomEvent.length)];
  }

  startRace() {
    console.log("=== 🚥 LIGHTS OUT AND AWAY WE GO! 💨 ===");

    const raceDuration = Math.floor(
      Math.random() * (this.raceMaxDuration - this.raceMinDuration) +
        this.raceMinDuration
    );

    this.eventEmitter.emit(F1Events.RACE_STARTED);

    const interval = setInterval(() => {
      console.log(this.generateRandomEvent());
    }, this.randomEventInterval);

    setTimeout(() => {
      clearInterval(interval);
      const winner = this.getRandomDriverName();
      this.eventEmitter.emit(F1Events.RACE_FINISHED, winner);
    }, raceDuration);
  }
}

module.exports = F1Race;

let modInfo = {
	name: "The Numbruh Tree",
	id: "JHTNT",
	author: "Jeehan2561",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: ".1",
	name: "Start",
}

let changelog = `<h1>Changelog:</h1><br>
    <h2>Warning: This mod may be unbalanced</h2><br>
	<h3>v.1 - Start</h3><br>
		- Added 3 Layers.<br>
		- Added 12 Achievements.<br>
		- Added 1 Buyable.<br>
		- Added 17 Upgrades.<br>
		Endgame: 3 total ones`
	

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade('zero', 24)) gain = gain.add(upgradeEffect('zero', 24))
	if(hasUpgrade('zero', 11)) gain = gain.times(upgradeEffect('zero', 11))
	if(hasUpgrade('zero', 12)) gain = gain.times(upgradeEffect('zero', 12))
	if(hasUpgrade('zero', 13)) gain = gain.times(upgradeEffect('zero', 13))
	if(hasUpgrade('zero', 15)) gain = gain.times(upgradeEffect('zero', 15))
	if(hasUpgrade('zero', 22)) gain = gain.times(upgradeEffect('zero', 22))
	gain = gain.times(buyableEffect('zero', 11))
	if(hasUpgrade('one', 11)) gain = gain.times(upgradeEffect('one', 11))
	if(hasUpgrade('one', 12)) gain = gain.times(upgradeEffect('one', 12))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	() => `<br>If you found a bug Please contact Jeehan2561#6268`,
	"<br>",
	() => player.keepGoing ? `You're past endgame. The Game may not balanced after this` : ""
]

// Determines when the game "ends"
function isEndgame() {
	return player.one.total.gte(new Decimal("3"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
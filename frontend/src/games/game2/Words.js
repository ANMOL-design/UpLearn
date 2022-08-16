var planets = [
	"mercury",
	"venus",
	"earth",
	"mars",
	"jupiter",
	"saturn",
	"neptune",
	"uranus"
]
function randomWord() {
	return  planets[Math.floor(Math.random() * planets.length)]
}

export { randomWord }
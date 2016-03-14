/**
 * Created by Ninja on 14/03/2016.
 */

/**
 * Export functions and variables
 * Available after a require
 */
var GameController = module.exports;

var IDLength = 10;
GameController.answers = [0, 1];

/**
 * Create Exist function for Array Object
 * Find if a value exist in the array
 * @param value
 * @returns {boolean}
 */
Array.prototype.exist = function (value)
{
	for(var i = 0; i < this.length; i++)
	{
		if (this[i] === value)
			return (true);
	}
	return (false);
};

/**
 * Generate a Random ID given the length IDLength
 * @returns {number}
 */
function generateInstanceID()
{
	return (Math.floor(Math.random() * Math.pow(10, IDLength)));
}

/**
 * Get a Random Int between @min @max
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max)
{
	return (Math.floor(Math.random() * (max - min)) + min);
}

/**
 * Return a Random Answer from the Array of possible Answers
 * @returns {*}
 */
GameController.getRandomAnswer = function()
{
	var answers = GameController.answers;

	return (answers[getRandomInt(0, answers.length)]);
};

/**
 * Create a new InstanceID
 */
GameController.generateNewID = function()
{
	GameController.instanceID = generateInstanceID();
};

/**
 * Return the current InstanceID
 */
GameController.getUpdate = function (req, res)
{
	res.status(200).json(
		{
			instanceID: GameController.instanceID
		});
};

// Init
GameController.currentAnswer = GameController.getRandomAnswer();
GameController.instanceID = generateInstanceID();
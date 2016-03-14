/**
 * Created by Ninja on 14/03/2016.
 */

Array.prototype.exist = function (id)
{
	for(var i = 0; i < this.length; i++)
	{
		if (this[i] === id)
			return (true);
	}
	return (false);
};

var GameController = module.exports;

var IDLength = 10;

GameController.answers = [0, 1];

function generateInstanceID()
{
	return (Math.floor(Math.random() * Math.pow(10, IDLength)));
}

function getRandomInt(min, max)
{
	return (Math.floor(Math.random() * (max - min)) + min);
}

GameController.getRandomAnswer = function()
{
	var answers = GameController.answers;

	return (answers[getRandomInt(0, answers.length)]);
};

GameController.generateNewID = function()
{
	GameController.instanceID = generateInstanceID();
};

GameController.getUpdate = function (req, res)
{
	res.status(200).json(
		{
			instanceID: GameController.instanceID
		});
};

GameController.currentAnswer = GameController.getRandomAnswer();
GameController.instanceID = generateInstanceID();
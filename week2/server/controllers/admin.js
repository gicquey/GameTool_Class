/**
 * Created by Ninja on 14/03/2016.
 */

var GameInstance = require('./game');

var AdminController = module.exports;

/**
 * Get All Answers
 */
AdminController.getAnswers = function (req, res)
{
	var answers = GameInstance.answers;

	res.status(200).json(
		{
			instanceID: GameInstance.instanceID,
			answers: answers
		});
};

/**
 * Get Current Answer
 */
AdminController.getCurrentAnswer = function (req, res)
{
	var currentAnswer = GameInstance.currentAnswer;

	res.status(200).json(
		{
			instanceID: GameInstance.instanceID,
			currentAnswer: currentAnswer
		});
};

/**
 * Add a new Answer to the Array
 * Randomly choose another one
 * InstanceID set to another value
 */
AdminController.addAnswer = function (req, res)
{
	var newNumber = Number(req.params.number);

	if (!GameInstance.answers.exist(newNumber))
	{
		GameInstance.answers.push(newNumber);
		GameInstance.currentAnswer = GameInstance.getRandomAnswer();
		GameInstance.generateNewID();

		res.status(200).json(
			{
				instanceID: GameInstance.instanceID,
				addedNumber: newNumber,
				currentAnswer: GameInstance.currentAnswer,
				answers: GameInstance.answers,
				message: 'New answer successfully added !'
			});
	}
	else
	{
		res.status(422).json(
			{
				instanceID: GameInstance.instanceID,
				currentAnswer: GameInstance.currentAnswer,
				answers: GameInstance.answers,
				message: 'Already added !'
			});
	}
};

/**
 * Change Current Answer
 * InstanceID set to another value
 */
AdminController.randomize = function (req, res)
{
	GameInstance.currentAnswer = GameInstance.getRandomAnswer();
	GameInstance.generateNewID();

	res.status(200).json(
		{
			instanceID: GameInstance.instanceID,
			currentAnswer: GameInstance.currentAnswer,
			answers: GameInstance.answers,
			message: 'Answer successfully randomized !'
		});
};


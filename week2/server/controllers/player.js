/**
 * Created by Ninja on 14/03/2016.
 */

var GameInstance = require('./game');

var PlayerController = module.exports;

PlayerController.compareAnswer = function (req, res)
{
	var playerNumber = Number(req.params.number);
	var result = (playerNumber === GameInstance.currentAnswer);

	res.status(200).json(
		{
			instanceID: GameInstance.instanceID,
			playerNumber: playerNumber,
			result: result
		});
};

#include "square.h"


square::square()
{
	//std::cout << "New Square created" << std::endl;
}


square::~square()
{
}

void square::setWalkable(bool walkable)
{
	isWalkable = walkable;
}

bool square::getWalkable()
{
	return (isWalkable);
}

void square::setCharacter(tyletype Character)
{
	if (Character != NEUTRAL)
	{
		containCharacter = true;
		isWalkable = false;
		blockVision = true;
		type = Character;
	}
	else
	{
		containCharacter = false;
		isWalkable = true;
		blockVision = false;
		type = NEUTRAL;
	}
}

void square::setType(tyletype newType)
{
	if ((newType != type && (type != PC && type != ENEMY)) && type != WALL)
	{
		type = newType;
		if (type == WALL)
		{
			isWalkable = false;
			blockVision = true;
		}
		else
		{
			isWalkable = true;
			blockVision = false;
		}
	}
}

void square::setCharacter(character* c)
{
	currentCharacter = c;
	if (currentCharacter->getType() == PLAYER_CHARACTER)
		type = PC;
	else if (currentCharacter->getType() == NPC_ENNEMY)
		type = ENEMY;
	else if (currentCharacter->getType() == NPC_NEUTRAL)
		type = NEUTRAL;
	isWalkable = false;
}

tyletype square::getCharacter()
{
	return (type);
}

tyletype square::getType()
{
	return (type);
}

void square::reinit()
{
	if (type != WALL)
	{
		type = NEUTRAL;
	}
	currentCharacter = NULL;
}
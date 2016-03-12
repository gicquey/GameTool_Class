#include "character.h"


character::character()
{
	levelUp(1);
}

character::character(characterType ct, int level)
{
	levelUp(level);
	type = ct;
}

character::~character()
{
}

void character::levelUp(int level)
{
	this->level = level;
}

characterType character::getType()
{
	return (type);
}

void character::setType(characterType newType)
{
	type = newType;
}

void character::startPosition(int x, int y)
{
	posX = x;
	posY = y;
}

void character::move(int destX, int destY)
{
	posX = destX;
	posY = destY;
}

int character::getSpeed()
{
	return (speed);
}
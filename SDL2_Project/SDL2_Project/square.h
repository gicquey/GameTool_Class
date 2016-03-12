#pragma once

#include <iostream>
#include "character.h"

typedef enum
{
	NEUTRAL,
	ENEMY,
	ENEMY_VISION,
	ENEMY_VISION_ALERTED,
	WALL,
	MOVEMENT,
	PC
} tyletype;

class square
{
public:
	square();
	~square();
	void setWalkable(bool);
	bool getWalkable();
	void setCharacter(tyletype);
	void setType(tyletype);
	void setCharacter(character*);
	tyletype getCharacter();
	tyletype getType();
	void reinit();

private:
	bool isWalkable = true;
	bool blockVision = false;
	bool containCharacter = false;
	tyletype type = NEUTRAL;
	character *currentCharacter = NULL;
};


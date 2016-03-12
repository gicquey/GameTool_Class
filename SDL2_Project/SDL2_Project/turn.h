#pragma once

#include <iostream>

typedef enum
{
	PLAYER,
	NPC
} current;

class turn
{
public:
	turn();
	~turn();
	void tick();
	current getCrT();
	void setCrT(current);
	int getTurn();

private:
	current crT;
	int	turnNb = 0;
};


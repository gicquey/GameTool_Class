#include "turn.h"


turn::turn()
{
	crT = PLAYER;
}

turn::~turn()
{
}

void turn::tick()
{
	if (crT == PLAYER)
	{
		std::cout << "Enemy turn" << std::endl;
		crT = NPC;
	}
	else
	{
		std::cout << "Player turn" << std::endl;
		crT = PLAYER;
	}
	turnNb++;
}

current turn::getCrT()
{
	return (crT);
}

void turn::setCrT(current caracTurn)
{
	crT = caracTurn;
}

int turn::getTurn()
{
	return(turnNb);
}
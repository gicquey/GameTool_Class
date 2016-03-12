#include "gameManager.h"


gameManager::gameManager()
{
}

gameManager::~gameManager()
{
}

void gameManager::initLoop()
{
	renderM.setMap("Grid10x10.png");
	characterM.addCharacter(PLAYER_CHARACTER, 1, 3, 2);
	characterM.addCharacter(NPC_ENNEMY, 1, 9, 8);
	gameLoop();
}

void gameManager::reinit()
{
	renderM.reinit();
}

void gameManager::handleRightClick()
{
	int x;
	int y;
	int mapX;
	int mapY;

	inputM.getMousePos(&x, &y);
	renderM.getMapSize(&mapX, &mapY);
	x /= 50;
	y /= 50;
	if ((x < mapX && y < mapY) && (renderM.iswalkable(x, y) == true))
	{
		characterM.movePC(x, y);
	}
}

void gameManager::gameLoop()
{
	while (quit == false)
	{
		
		if (turnM.getCrT() == PLAYER)
		{
			switch (inputM.getInput())
			{
			case (QUIT) :
				quit = true;
				break;
			case (LEFT_CLICK) :
				break;
			case (RIGHT_CLICK) :
				handleRightClick();
				break;
			default:
				break;
			}
		}
		else
		{
			reinit();
		}
		update();
		renderM.render();
		if (inputM.getEventHappened() == true || turnM.getCrT() == NPC)
		{
			turnM.tick();
			currentPlayerId = turnM.getTurn() % characterM.getCharacterNb();
			if (characterM.getCharacter(currentPlayerId)->getType() == PLAYER_CHARACTER)
			{
				selectArea(MOVEMENT);
			}
		}
	}
}

void gameManager::selectArea(tyletype area)
{
	switch (area)
	{
	case (MOVEMENT) :
			renderM.drawWalkable(
				characterM.getCharacter(currentPlayerId)->posX, 
				characterM.getCharacter(currentPlayerId)->posY, 
				characterM.getCharacter(currentPlayerId)->getSpeed());
		break;
	default:
		break;
	}
}

void gameManager::update()
{
	int characterNb = 0;

	characterNb = characterM.getCharacterNb();
	for (int i = 0; i < characterNb; i++)
	{
		renderM.addCharacter(characterM.getCharacter(i), characterM.getCharacter(i)->posX, characterM.getCharacter(i)->posY);
	}
}

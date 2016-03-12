#pragma once

#include <iostream>
#include "renderManager.h"
#include "characterManager.h"
#include "inputManager.h"
#include "map.h"
#include "turn.h"

#define FPS 60

class gameManager
{
public:
	gameManager();
	~gameManager();
	void update();
	void initLoop();
	void gameLoop();

private:

	void reinit();
	void handleRightClick();
	void selectArea(tyletype);

	inputManager inputM;
	renderManager renderM;
	characterManager characterM;
	turn turnM;
	bool quit = false;
	int currentPlayerId = 0;
};


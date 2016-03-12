#pragma once

#include <iostream>
#include <SDL.h>

typedef enum
{
	NONE,
	RIGHT_CLICK,
	LEFT_CLICK,
	QUIT
} input;

class inputManager
{
public:
	inputManager();
	~inputManager();
	input getInput();
	void reinit();
	void getMousePos(int*, int*);
	bool getEventHappened();

private:
	SDL_Event e;
	bool eventHappened = false;
	int input;
	int mouseX = -1;
	int mouseY = -1;
};


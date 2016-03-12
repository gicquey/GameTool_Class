#include "inputManager.h"


inputManager::inputManager()
{
}

inputManager::~inputManager()
{
}

void inputManager::reinit()
{
	e.type = NULL;
	eventHappened = false;
}

input inputManager::getInput()
{
	//std::cout << "get input" << std::endl;
	reinit();
	SDL_PollEvent(&e);
	switch (e.type)
	{
	case (SDL_QUIT) :
		eventHappened = true;
		return (QUIT);
		break;

	case (SDL_KEYDOWN) :
		switch (e.key.keysym.sym)
	{
		case (SDLK_ESCAPE) :
			return (QUIT);
			break;
		default:
			return (NONE);
			break;
	}
		break;

	case (SDL_MOUSEBUTTONDOWN):
		eventHappened = true;
		if (e.button.button == SDL_BUTTON_LEFT)
		{
			mouseX = e.button.x;
			mouseY = e.button.y;
			return (LEFT_CLICK);
		}
		else if (e.button.button == SDL_BUTTON_RIGHT)
		{
			mouseX = e.button.x;
			mouseY = e.button.y;
			return (RIGHT_CLICK);
		}
		break;
	default:
		return (NONE);
		break;
	}
}

void inputManager::getMousePos(int* x, int* y)
{
	*x = mouseX;
	*y = mouseY;
}

bool inputManager::getEventHappened()
{
	return (eventHappened);
}
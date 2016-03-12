#include "renderManager.h"


renderManager::renderManager()
{
	if (SDL_Init(SDL_INIT_VIDEO) < 0)
		std::cerr << "SDL could not initialize. SDL_Error: " << SDL_GetError() << std::endl;
	else
	{
		window = SDL_CreateWindow("Prototype", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, WIN_WIDTH, WIN_HEIGHT, SDL_WINDOW_SHOWN);
		if (!window)
			std::cerr << "Window could not be created. SDL_Error: " << SDL_GetError() << std::endl;
		else
		{
			int imgFlags = IMG_INIT_PNG;
			if (!(IMG_Init(imgFlags) & imgFlags))
			{
				std::cerr << "SDL_image could not initialize. SDL_image Error: " << IMG_GetError() << std::endl;
			}
			else
				screenSurface = SDL_GetWindowSurface(window);
		}
	}
	mappy.setSize(currentMapSizeX, currentMapSizeY);
}

renderManager::~renderManager()
{
	if (window)
		SDL_DestroyWindow(window);
	SDL_Quit();
}

void renderManager::drawElements()
{
	for (int y = 0; y < currentMapSizeY; y++)
	{
		for (int x = 0; x < currentMapSizeX; x++)
		{
			switch (mappy.getSquare(x, y).getType())
			{
			case (NEUTRAL):
				loadElement("Neutral.png", x, y);
				break;
			case (WALL) :
				loadElement("Wall.png", x, y);
				break;
			case (ENEMY) :
				loadElement("Enemy.png", x, y);
				break;
			case (PC) :
				loadElement("PC.png", x, y);
				break;
			case (MOVEMENT) :
				loadElement("Movement.png", x, y);
				break;
			default:
				break;
			}
		}
	}
}

void renderManager::render()
{
	//std::cout << "render scene" << std::endl;
	drawElements();
	SDL_UpdateWindowSurface(window);
}

void renderManager::setMap(std::string path)
{
	mapPath = path;
	//loadMap();
}

void renderManager::loadMap()
{
	SDL_Surface* ldSurface = IMG_Load(mapPath.c_str());

	if (!ldSurface)
	{
		std::cerr << "Unable to load image " << mapPath.c_str() << " SDL_image Error: " << IMG_GetError() << std::endl;
	}
	else
	{
		opSurface = SDL_ConvertSurface(ldSurface, screenSurface->format, NULL);
		if (!opSurface)
		{
			std::cerr << "Unable to optimize image " << mapPath.c_str() << " SDL Error: " << SDL_GetError() << std::endl;
		}
		SDL_FreeSurface(ldSurface);
	}
	SDL_BlitSurface(opSurface, NULL, screenSurface, NULL);
	SDL_FreeSurface(opSurface);
}

void renderManager::loadElement(std::string elemPath, int x, int y)
{
	SDL_Surface* ldSurface = IMG_Load(elemPath.c_str());

	if (!ldSurface)
	{
		std::cerr << "Unable to load image " << elemPath.c_str() << " SDL_image Error: " << IMG_GetError() << std::endl;
	}
	else
	{
		opSurface = SDL_ConvertSurface(ldSurface, screenSurface->format, NULL);
		if (!opSurface)
		{
			std::cerr << "Unable to optimize image " << elemPath.c_str() << " SDL Error: " << SDL_GetError() << std::endl;
		}
		SDL_FreeSurface(ldSurface);
	}
	SDL_Rect stretchRect;
	stretchRect.x = 10 + 50 * x;
	stretchRect.y = 10 + 50 * y;
	stretchRect.w = 40;
	stretchRect.h = 40;
	SDL_BlitSurface(opSurface, NULL, screenSurface, &stretchRect);
	SDL_FreeSurface(opSurface);
}

void renderManager::addCharacter(character* c, int x, int y)
{
	mappy.addCharacter(c, x, y);
}

void renderManager::reinit()
{
	mappy.reinit();
}

void renderManager::drawWalkable(int x, int y, int distance)
{
	mappy.walkable(x, y, distance);
}

void renderManager::getMapSize(int* x, int* y)
{
	*x = currentMapSizeX;
	*y = currentMapSizeY;
}

bool renderManager::iswalkable(int x, int y)
{
	if (mappy.getSquare(x, y).getType() == MOVEMENT)
	{
		return (true);
	}
	return (false);
}
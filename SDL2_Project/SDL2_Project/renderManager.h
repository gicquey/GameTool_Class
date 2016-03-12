#pragma once

#include <iostream>
#include <SDL.h>
#include <SDL_image.h>

#include "map.h"
#include "square.h"
#include "character.h"

#define WIN_WIDTH 1280
#define WIN_HEIGHT 720

class renderManager
{
public:
	renderManager();
	~renderManager();
	void render();
	void addCharacter(character* c, int x, int y);
	void drawWalkable(int, int, int);
	void setMap(std::string);
	void reinit();
	void getMapSize(int*, int*);
	bool iswalkable(int, int);

private:
	void loadMap();
	void drawElements();
	void loadElement(std::string, int, int);

	SDL_Window* window = NULL;
	SDL_Surface* screenSurface = NULL;

	int currentMapSizeX = 12;
	int currentMapSizeY = 12;

	std::string mapPath = "";
	SDL_Surface* opSurface = NULL;
	bool success;

	map mappy;
};


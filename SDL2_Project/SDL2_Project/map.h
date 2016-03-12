#pragma once

#include <iostream>
#include "square.h"

class map
{
public:
	map();
	~map();
	square getSquare(int, int);
	void setSize(int x, int y);
	void addCharacter(character*, int, int);
	void reinit();
	void walkable(int, int, int);

private:
	square **grid;
	int x = 0;
	int y = 0;
};


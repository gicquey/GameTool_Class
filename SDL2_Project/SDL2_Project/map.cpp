#include "map.h"


map::map()
{
}

map::~map()
{
}

square map::getSquare(int x, int y)
{
	return (grid[y][x]);
}

void map::setSize(int x, int y)
{
	this->x = x;
	this->y = y;
	grid = new square*[y + 1];
	for (int i = 0; i < y; i++)
		grid[i] = new square[x + 1];
	grid[5][3].setType(WALL);
	grid[5][4].setType(WALL);
	grid[5][5].setType(WALL);
	grid[5][6].setType(WALL);
	grid[5][7].setType(WALL);
	grid[6][3].setType(WALL);
}

void map::addCharacter(character* c, int x, int y)
{
	grid[y][x].setCharacter(c);
}

void map::reinit()
{
	for (int i = 0; i < y; i++)
	{
		for (int j = 0; j < x; j++)
		{
			grid[i][j].reinit();
		}
	}
}

void map::walkable(int startX, int startY, int size)
{
	std::cout << "check around case " << startX << " " << startY << std::endl;
	if (size > 0)
	{
		//std::cout << "Movement area start from " << startX << " " << startY << " and spread on " << size << " squares" << std::endl;
		if (startX + 1 < x && grid[startY][startX + 1].getWalkable() == true)
		{
			std::cout << "\t" << startX + 1 << " " << startY << " is walkable" << std::endl;
			grid[startY][startX + 1].setType(MOVEMENT);
			walkable(startX + 1, startY, size - 1);
		}
		if (startX - 1 >= 0 && grid[startY][startX - 1].getWalkable() == true)
		{
			std::cout << "\t" << startX - 1 << " " << startY << " is walkable" << std::endl;
			grid[startY][startX - 1].setType(MOVEMENT);
			walkable(startX - 1, startY, size - 1);
		}
		if (startY - 1 >= 0 && grid[startY - 1][startX].getWalkable() == true)
		{
			std::cout << "\t" << startX << " " << startY - 1 << " is walkable" << std::endl;
			grid[startY - 1][startX].setType(MOVEMENT);
			walkable(startX, startY - 1, size - 1);
		}
		if (startY + 1 < x && grid[startY + 1][startX].getWalkable() == true)
		{
			std::cout << "\t" << startX << " " << startY + 1 << " is walkable" << std::endl;
			grid[startY + 1][startX].setType(MOVEMENT);
			walkable(startX, startY + 1, size - 1);
		}
	}
}
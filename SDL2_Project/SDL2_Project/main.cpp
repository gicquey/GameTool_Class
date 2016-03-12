#include "main.h"

#undef main

int main(int ac, char **av)
{
	gameManager game;

	game.initLoop();
	return (0);
}

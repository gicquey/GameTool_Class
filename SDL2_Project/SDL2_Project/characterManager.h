#pragma once

#include "character.h"
#include <vector>

class characterManager
{
public:
	characterManager();
	~characterManager();

	void addCharacter(characterType, int, int, int);
	void deleteCharacter(int);
	int getCharacterNb();
	character* getCharacter(int);
	character* getCharacter(int, int);
	void movePC(int, int);

private:
	std::vector<character> characterList;
};


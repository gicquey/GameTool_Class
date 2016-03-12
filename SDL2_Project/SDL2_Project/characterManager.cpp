#include "characterManager.h"


characterManager::characterManager()
{
}

characterManager::~characterManager()
{
}

void characterManager::addCharacter(characterType ct, int level, int x, int y)
{
	character newCharacter(ct, level);
	newCharacter.move(x, y);
	characterList.push_back(newCharacter);
}

void characterManager::deleteCharacter(int id)
{

}

int characterManager::getCharacterNb()
{
	return (characterList.size());
}

character* characterManager::getCharacter(int id)
{
	if ((unsigned int)id < characterList.size())
		return (&characterList[id]);
	return (NULL);
}

void characterManager::movePC(int x, int y)
{
	for (int i = 0; i < characterList.size(); i++)
	{
		if (characterList[i].getType() == PLAYER_CHARACTER)
		{
			characterList[i].move(x, y);
			return;
		}
	}
}


#pragma once

typedef enum
{
	NPC_NEUTRAL,
	NPC_ENNEMY,
	PLAYER_CHARACTER
} characterType;

class character
{
public:
	character();
	character(characterType, int);
	~character();

	void startPosition(int, int);
	void update();
	void takeDamage(int damages);
	void heal(int amountHeal);
	void gainXp(int amountXp);
	void move(int destX, int destY);
	int getSpeed();
	characterType getType();
	void setType(characterType);

	void levelUp(int);


	int posX;
	int posY;

private:

	void attack(int posX, int posY);
	void setAttribute();
	void death();

	int totalHp;
	int currentHp;
	int level;
	int xpNeeded;
	int xp;
	int strength;
	int accuracy;
	int speed = 3;
	int actions = 1;

	characterType type;
};


# GameTool_Class
*Repository created to store productions during the class of game tool development at BJTU*

## Members:

  - Youri Gicquel 15129062
  - Eric Hu 15129035
  - Thomas Martin 15129056
  - Axel De Sousa 15129087
  - Nicolas Montredon 15129055

## Week 2: Create a game editor

###  Problems:

*Online game ship features 7x24 can't afford down time.
Games span multiple devices.*
  
### Goals:

Create a game editor which can work while the game is running. Make it cross-platform.
#### Implicit challenges:
	- Operator push changes to the server
	- Game clients get change from the server
	- The server won't get down when deploying new binaries
	- Support multiple platform
  
### User Story:

- Game operator add a number to the list of numbers to guess.
- Player can choose a number to guess.
- Game operator can delete a number from the list.

### Architecture:

	Coder -> server
	server <-> clients
	storage -> server
	editor <-> storage
	Operator -> server

#### Details of components:

  
### Milestones:
  (Tuesday) March 15th: Server + Player + Operator on pc should be completed.
  (Saturday) March 19th 23h59, Beijing Time : "/README.md" should be completed, containing actuals Problems, Goals, User Story, Architecture, Details of Components, and Milestones.

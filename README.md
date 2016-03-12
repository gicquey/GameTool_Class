# GameTool_Class
Repository created to store productions during the class of game tool development at BJTU

members:
  Youri Gicquel 15129062
  Eric Hu
  Thomas Martin 15129056
  Axel De Sousa
  Nicolas Montredon 15129055

Exercise Week 1: Develop a ubiquitous communication framework

Problems:
  The video game industry has to handle more and more different devices over the last years. For a same game, depending of the platform, a developper team can have to struggle with controllers, keyboard, mouse, touchpad... In this case, a tool which can get all of those input and just send a message to the game describing what action is needed for those input is a necessity.
  
Goals:
  There are to big goals for this tool. The first is to be able to handle each required device input. The second is to associate the different inputs to one or more actions.
  
User Story:
  As a user, I want a tool easy to use.
	As a user, I want a tool I can configure if needed.
	As a user, I want to be able to easily add a new device.
	As a user, I want to be able to choose if a device must be listened or not.

Architecture:
  Device Input -> Framework computation -> Framework output -> game

  Class InputManager:
      enum inputMeaning:
        XXX,
        YYY,
        ZZZ
      
      function getInput(float timeout, int id)
      function resetInputQueue()
      function getInputStored()
      
      Devices[] devicesType
      int[] deviceId
      inputMeaning inputHandled
      

Details of components:
  inputMeaning is an array where every input used in the game is paired to an int value.
  getInput() is the entry function, it will wait "timeout" millisecond for an input from the controller "id".
  resetInputQueue() is a fonction that set "inputHandled" to NONE.
  getInputStored() send "inputHandled" to the game.
  devicesType is an array of the devices supported by the tool
  deviceId pair an id to the corresponding "devicesType"
  inputHandled is an bit-field that fill-up with each input until resetInputQueue is called.
  
Milestones:

# Tic Tac Toe Game

This is a Tic Tac Toe game built with React, 
featuring both 1-player (vs. Bot) and 2-player modes,
along with a lives system for competitive play. 
This README also documents the prompts used to 
generate parts of this project using a large language model (IBM Granite)

# Table of Contents

* [Tic Tac Toe Game](#tic-tac-toe-game)
  * [Table of Contents](#table-of-contents)
  * [Features](#features)
  * [Development Prompts & Results](#development-prompts--results)
    * [Phase 1: UI Preparation](#phase-1-ui-preparation)
      * [Step 1: Create StartScreen Component](#step-1-create-startscreen-component)
    * [Phase 2: Game Board Components](#phase-2-game-board-components)
      * [Step 2.1: Create Square Component](#step-21-create-square-component)
      * [Step 2.2: Create Board Component](#step-22-create-board-component)
    * [Phase 3: Core Game Logic & Lives System](#phase-3-core-game-logic--lives-system)
      * [Step 3.1: calculateWinner Function](#step-31-calculatewinner-function)
      * [Step 3.2: LivesDisplay Component](#step-32-livesdisplay-component)
    * [Phase 4: Bot Logic (for 1-Player Mode)](#phase-4-bot-logic-for-1-player-mode)
      * [Step 4.1: makeBotMove Function (Hard Bot with Minimax)](#step-41-makebotmove-function-hard-bot-with-minimax)
    * [Phase 5: Main Game Component (Game.js) & Global View Management](#phase-5-main-game-component-gamejs--global-view-management)
      * [Step 5.1: Create Game Component (Main Logic & State)](#step-51-create-game-component-main-logic--state)
      * [Step 5.2: Global View Management in App.js](#step-52-global-view-management-in-appjs)
      * [Step 5.3: CSS Styling](#step-53-css-styling)
  * [Styling](#styling)
 
# Features
* Two Game Modes: Play against an unbeatable AI bot (1-player) or challenge a friend (2-player).
* Lives System: A unique feature where each player has a set number of lives, and losing a round reduces a life. The game ends when a player runs out of lives.
* Minimax AI: The 1-player mode features an advanced AI using the Minimax algorithm, making it a challenging opponent.
* Responsive Design: Enjoy the game seamlessly across various devices and screen sizes.
* Clear UI: Intuitive and clean user interface for an engaging gaming experience.

#Development Prompts & Results

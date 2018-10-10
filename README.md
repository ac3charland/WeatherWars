# WeatherWars

[Play The Deployed Version Here](https://weatherwars.herokuapp.com/index.html)

Weather Wars is a turn-based combat game that pits two cities against one another based on their current weather.
A city's HP is determined by factors like safety, overall happiness and cloud cover. Each city has up to 4 possible attacks: basic, hot, cold and storm. Each attack has a certain damage number which helps bring down the Health of your opponet. The game ends when either player's health reaches zero. 


### Motivation

Many of us on the Weather Wars team love gaming, and we wanted to put our own twist on the classic turn-based combat genre.

### Tech/Frameworks Used:

* Materialize
* jQuery
* Firebase
* Built with Visual Studio Code

### Another Turn-Based Combat Game?
Weather Wars is unique because we take live information from a variety of cities from around the world and we impelement that data into the game. Weather Wars is the only turn-based combat game (that we know of) that changes with the seasons and the weather.


### APIs Used:
* https://api.darksky.net/forecast
* https://api.teleport.org/api/cities/geonameid
* https://api.teleport.org/api/urban_areas/slug

### How to Play
1. Select a city
    * A city's HP is determined by factors like safety, overall happiness and cloud cover
2. *Wait for your opponet to choose a city and enter the game* 
3. Select an attack to try and damage your opponet's health (hp)
    * Each city has 4 different possible attacks, each depending on the current weather of the selected city. The four attacks are basic, hot, cold and storm. The basic attack deals 10 damage. The hot attack deals 17.5 damage to the enemy player while damaging the attacking player for 5 damage. The cold attack deals 15 damage to the enemy while freezing the attacker for 1 turn. Finally, the storm attack deals 5 damage while enabling you to attack again immediately.
4. *While you are playing you can chat with your opponent*
5. Keep choosing attacks to damage your opponents health.
6. The game ends when either players health reaches zero
7. At the end if you win or lose you will get 3 options: continue, restart, and more information. "More Information" takes you to a page where you can view the API data we retrieved for all the cities in the game.

Our Team:
* Project Manager: 
    * [ac3charland](https://github.com/ac3charland)
* Frontend: 
    * [seeseexiong](https://github.com/seeseexiong)
    * [liavramirez21](https://github.com/liavramirez21)
* APIs & Backend: 
    * [Alex-Chrysler](https://github.com/Alex-Chrysler)
* Game Design:  
    * [AshymOR](https://github.com/AshymOR)
    * [Pharaoh434](https://github.com/Pharaoh434)




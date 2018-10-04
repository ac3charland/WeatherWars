
//defense is determined by cloud cover, 0-no bonus, 1-3, a 5% bonus,
//4-6, a 10% bonus, 7-10, a 15% bonus,

// var cloudCover=0 //The cloudCover from the api
// var atk = 10

// var dfs = 0
// if (cloudCover >= 7) {
//     dfs = dfs + 15;
// } else if (cloudCover >= 4) {
//     dfs = dfs + 10;
// } else if (cloudCover >= 1)
// {
//     dfs = dfs + 5;
// }

// var hp = dfs+100
// console.log(dfs)
// console.log(hp)

//atk is basic attack, hatck and catk and satk are the modified attacks
var temp = 50
var atk = -10
var catk=0
var hatk=0

//this is where temperature defines what kind of attacks ara available
//this is to determine if it will be a cold attack
if( temp < 30) {
    catk=atk-5;//Skips a turn, cannot code until turns are implemented
//to determine if it is a hot attack
} else if (temp > 75)
hatk=atk-7.5,hp=hp-5;




var Player1=Player1
var Player2=Player1
var Game= Game;{
    Player1;{
        var cloudCover=8 //The cloudCover from the api
        var atk = -10
        
        var dfs = 0
        if (cloudCover >= 7) {
            dfs = dfs + 15;
        } else if (cloudCover >= 4) {
            dfs = dfs + 10;
        } else if (cloudCover >= 1)
        {
            dfs = dfs + 5;
        }
        if( temp < 30) {
            catk=atk-5;
        } else if (temp > 75)
        hatk=atk-7.5,hp=hp-5;
        
        var win=(p2hp=0)
        var p1hp = dfs+100
        console.log ("player1 Health", + p1hp)
    }
    Player2;{
        var p2cloudCover=4 //The cloudCover from the api
        var atk = -10
        
        var dfs = 0
        if (p2cloudCover >= 7) {
            dfs = dfs + 15;
        } else if (p2cloudCover >= 4) {
            dfs = dfs + 10;
        } else if (p2cloudCover >= 1)
        {
            dfs = dfs + 5;
        }
        if( temp < 30) {
            catk=atk-5;
        } else if (temp > 75)
        hatk=atk-7.5,hp=hp-5;
        var p2hp = dfs+100
        
        console.log ("player2 Health", + p2hp);

    }
    var Player1turn=true
    var Player2turn=false
    var Player1frozen=false
    var Player2frozec=false
    function attack(){
    if (Player1turn=true){
        
    }
   
        
    }





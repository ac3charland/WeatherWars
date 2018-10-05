// function gameStarted(){
//     Player1turn=false;
// }

// gameStarted();


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




var Game= {
    
    
    
};

var Player1={
        cloudCover:8, //The cloudCover from the api
        p1atk: 10,
        p1hp:100

        // dfs:0,
        // if (cloudCover >= 7) {
        //     dfs = dfs + 15;
        // } else if (cloudCover >= 4) {
        //     dfs = dfs + 10;
        // } else if (cloudCover >= 1)
        // {
        //     dfs = dfs + 5;
        // }
        // if( temp < 30) {
        //     catk=atk-5;
        // } else if (temp > 75)
        // hatk=atk-7.5,hp=hp-5;
        
        // var win=(p2hp=0)
        // var p1hp = dfs+100
        // console.log ("player1 Health", + p1hp)
    }
var Player2={
        p2cloudCover:4, //The cloudCover from the api
        p2atk: 10,
        p2hp:100
        // var dfs = 0
        // if (p2cloudCover >= 7) {
        //     dfs = dfs + 15;
        // } else if (p2cloudCover >= 4) {
        //     dfs = dfs + 10;
        // } else if (p2cloudCover >= 1)
        // {
        //     dfs = dfs + 5;
        // }
        // if( temp < 30) {
        //     catk=atk-5;
        // } else if (temp > 75)
        // hatk=atk-7.5,hp=hp-5;
        // var p2hp = dfs+100
        
        // console.log ("player2 Health", + p2hp);

    }
    var Player1turn = true
    var Player2turn = false
    var Player1frozen = false
    var Player2frozec = false
    
    function attack() {
        if (Player1turn){
            Player2.p2hp-=Player1.p1atk;
            console.log("Player1's Turn");
            console.log ("player2 Health", + Player2.p2hp);
            Player1turn=false;
            Player2turn=true
        } else if (Player2turn){
            Player1.p1hp-=Player2.p2atk;
            console.log ("Player2's Turn");
            console.log ("player1 Health", + Player1.p1hp);
            Player2turn=false;
            Player1turn=true;
        }
        
    }     

$(document).on("click","#button", function(){
    attack();
})

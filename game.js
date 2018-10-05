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



 function Player(cloudCover, atk, hp){
        this.cloudCover = cloudCover;
        this.atk=atk;
        this.hp=hp;
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
var Game= {
    
    Player1turn: true,
    Player2turn: false,
    Player1frozen: false,
    Player2frozen: false,
    
   
   
  Player1: new Player(8, 10, 100),

  Player2: new Player(4, 10, 100), 
attack: function() {
        if (this.Player1turn){
            this.Player2.hp-=this.Player1.atk;
            console.log("Player1's Turn");
            console.log ("player2 Health", + this.Player2.hp);
            this.Player1turn=false;
            this.Player2turn=true
        } else if (this.Player2turn){
            this.Player1.hp-=this.Player2.atk;
            console.log ("Player2's Turn");
            console.log ("player1 Health", + this.Player1.hp);
            this.Player2turn=false;
            this.Player1turn=true;
        }     
    }
};


   
    
         

$(document).on("click","#button", function(){
    Game.attack();
})

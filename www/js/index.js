//import { Highscore , Starfield, InputPanel}  from './Highscore.js';

const config = {
    type: Phaser.AUTO,  //El phaser identificará si el navegador puede correr WEBGL o CANVAS
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [Game, Highscore, Starfield, InputPanel]
};
var game = new Phaser.Game(config);

var platforms = null;
var score = 0;
var scoreText = '';
var player;
var cursors;
var stars;
var bombs;
var puntajeFinal;
var db= firebase.firestore();



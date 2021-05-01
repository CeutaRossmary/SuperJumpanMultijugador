var platforms = null;
var score = 0;
var scoreText = '';
var player;
var cursors;
var stars;

class Game extends Phaser.Scene{

    userText;

    constructor(){
        super({key: 'Game', active: true});
    }

    init(){
        this.scene.bringToTop("Game");
        this.scene.stop("Highscore"); // Detiene la escena Highscore
        this.scene.stop("Starfield"); // Detiene la escena Starfield
        this.scene.stop("InputPanel"); // Detiene la escena InputPanel
    }
    
    //Se ejecutará antes de que el juego cargue. Es un buen lugar para importar aquellos archivos que usemos en éste.
    preload () {

        this.load.audio('gameover', 'assets/gameover.mp3');
        this.load.audio('coin', 'assets/coin.mp3');
        this.load.image('sky', 'assets/sky.png');
        // el suelo es una imagen de 400x32 px
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
       // this.load.image('imagen-game-over', 'assets/gameover2.png');
    }
    
    //Se ejecutará al momento de que el juego inicie. Es un buen lugar para ingresar todos los objetos que se mostrarán en pantalla.
    create () {   

        this.GameOver = this.sound.add('gameover');
        this.Coin = this.sound.add('coin');
        this.add.image(400, 300, 'sky');
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // añadimos la plataforma de más abajo, duplicamos sus dimensiones y actualizamos. Después de redimensionar será una imagen de 800x64px
        // luego añadimos otras plataformas en pantalla
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
    
        
        // añadimos el sprite
        player = this.physics.add.sprite(100, 450, 'dude');

        player.setBounce(0.4);
        player.setCollideWorldBounds(true);
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        
        //// crea las estrellas
        cursors = this.input.keyboard.createCursorKeys();
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        stars.children.iterate(function (child) {
        
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });
        // bombas las
        bombs = this.physics.add.group();
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);
       // this.physics.arcade.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.overlap(player, bombs, this.hitBomb, null, this);
        
        
        }

        
         collectStar (player, star){
            star.disableBody(true, true);
    
            //Actualizando el puntaje del personaje
            score += 10;
            this.Coin.play();
            scoreText.setText('Score: ' + score);
            puntajeFinal= score;
            console.log(puntajeFinal);
            if (stars.countActive(true) === 0)
            {
                stars.children.iterate(function (child) {
    
                    child.enableBody(true, child.x, 0, true, true);
    
                });
    
                var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    
                var bomb = bombs.create(x, 16, 'bomb');
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        }
    
        update () {
            cursors = this.input.keyboard.createCursorKeys();
            // animacion de moverse hacia la izquierda
            if (cursors.left.isDown)
        {
            // se fija la velocidad de -160 en el eje X
            player.setVelocityX(-180);
        
            player.anims.play('left', true);
        }
        // animacion de moverse hacia la derecha
        else if (cursors.right.isDown)
        {
            player.setVelocityX(180);
        
            player.anims.play('right', true);
        }
        // animacion de estar quieto
        else
        {
            player.setVelocityX(0);
        
            player.anims.play('turn');
        }
        //  animacion de saltar
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }
        }
        
       hitBomb (player, bomb)
        {
            this.physics.pause();
            player.setTint(0xff0000);
            this.GameOver.play();
            player.anims.play('turn');
            this.scene.stop('Game'); // Detiene la escena Game
            this.scene.start("Highscore");  //Muestra la escena del Ranking de puntajes
            this.scene.bringToTop("Highscore"); //Coloca la escena del Ranking de puntajes encima de las otras escenas
            this.scene.start("InputPanel"); //Muestra la escena InputPanel
            this.scene.start("Starfield") //Muestra la escena Starfield
            
               
           
          
        };
        

          
            
        
        
    
    }


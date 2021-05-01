

class Highscore extends Phaser.Scene { 

   

        constructor ()
        {
            super({ key: 'Highscore', active: true });
            this.playerText;
          
          
        }
    
        preload() {
            
            this.load.setCORS('anonymous');
            this.load.setBaseURL('//labs.phaser.io/');
    
            this.load.image('block', 'assets/input/block.png');
            this.load.image('rub', 'assets/input/rub.png');
            this.load.image('end', 'assets/input/end.png');
            this.load.bitmapFont('arcade', 'assets/fonts/bitmap/arcade.png', 'assets/fonts/bitmap/arcade.xml');
        }
    
        create() {
            this.add.bitmapText(100, 330, 'arcade', '  SCORE   NAME').setTint(0xff00ff);
            this.add.bitmapText(200, 380, 'arcade',  + puntajeFinal).setTint(0xff0000);
            
            this.playerText = this.add.bitmapText(430, 380, 'arcade', '').setTint(0xff0000);
         
            this.input.keyboard.enabled = false;
            this.scene.launch('InputPanel');
            let panel = this.scene.get('InputPanel');
    
    
            panel.events.on('updateName', this.updateName, this);
            panel.events.on('submitName', this.submitName, this);
        }
    
        submitName() {
            this.scene.stop('InputPanel');
            
            // se guarda en la base de datos
            db.collection("SuperJump").add({
                nombre: this.playerText.text,
                score:puntajeFinal
            })    
            .catch(error => {
                console.log(error);
                alert('No pudimos registrar tu puntaje. Lo sentimos.');
            });
          
    
           
            // Muestra los primeros 10 puntajes de la base de datos.

            var tabla=document.getElementById('puntaje');
            document.getElementById('titulo').style.display = 'block';
            document.getElementById('datos').style.display = 'block';
            db.collection("SuperJump").orderBy("score", "desc").limit(10).onSnapshot((querySnapshot)  => {
                tabla.innerHTML = '';
                querySnapshot.forEach((doc) => {
                    console.log(`${doc.id} => ${doc.data().nombre}`);
                    tabla.innerHTML += `
                     <tr>
                     <td>${doc.data().nombre}</td>
                     <td>${doc.data().score}</td>   
                     </tr>
                     `
                     
                });

                // Se actitva el boton para reiniciar el juego 
                document.getElementById('btn').style.display = 'block';
                document.getElementById('btn').addEventListener('click', reload);

                //  funcion para reiniciar el juego
                function reload(){
                location.reload();
                }
                
               
                
            });

            
        }
      
       

        updateName(name) {
            this.playerText.setText(name);
        }
    }

 

                    
                
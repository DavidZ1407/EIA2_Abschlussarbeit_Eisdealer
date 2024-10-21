namespace IceShop {
    // Klasse für Stühle
    export class Chair {
        //Eigenschaft Position X,Y und ob jemand sitzt
        public positionX: number;
        public positionY: number;
        public seated: boolean;

        //Vorbereitung der X,Y Position und Setzt den Status auf 'nicht besetzt'
        constructor(_positionX: number, _positionY: number) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.seated = false;
        }
        //Stuhl zeichnen, Zugriff auf alle Klassen
        public draw(): void {
            crc2.save(); 
            crc2.fillStyle = "red";
            crc2.fillRect(this.positionX, this.positionY, 30, 30); 
            crc2.restore(); // Stellt den vorher gespeicherten Zustand des Zeichenkontexts wieder her. 
            crc2
        }

        
    }
}
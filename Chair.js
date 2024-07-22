"use strict";
var IceShop;
(function (IceShop) {
    // Klasse für Stühle
    class Chair {
        //Eigenschaft Position X,Y und ob jemand sitzt
        positionX;
        positionY;
        seated;
        //Vorbereitung der X,Y Position und Setzt den Status auf 'nicht besetzt'
        constructor(_positionX, _positionY) {
            this.positionX = _positionX;
            this.positionY = _positionY;
            this.seated = false;
        }
        //Stuhl zeichnen, Zugriff auf alle Klassen
        draw() {
            IceShop.crc2.save();
            IceShop.crc2.fillStyle = "red";
            IceShop.crc2.fillRect(this.positionX, this.positionY, 30, 30);
            IceShop.crc2.restore(); // Stellt den vorher gespeicherten Zustand des Zeichenkontexts wieder her. 
        }
    }
    IceShop.Chair = Chair;
})(IceShop || (IceShop = {}));
//# sourceMappingURL=Chair.js.map
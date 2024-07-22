"use strict";
var IceShop;
(function (IceShop) {
    // Enum für verschiedne Soßen-Typen
    let SauceType;
    (function (SauceType) {
        SauceType["Chocolate"] = "chocolate";
        SauceType["Strawberry"] = "strawberry";
    })(SauceType = IceShop.SauceType || (IceShop.SauceType = {}));
    //Klasse für Soße, Position und Type
    class Sauce {
        position;
        type;
        // Konstruktor der Soßen-Klasse
        constructor(position, type) {
            this.position = position;
            this.type = type;
        }
        // Methode zum Zeichnen der Sauce
        draw(crc2) {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            // Wähle die Farbe für die Sauce basierend auf dem Typ
            switch (this.type) {
                case SauceType.Chocolate:
                    crc2.strokeStyle = "#4B2E2A"; // Dunkelbraun für Schokoladensauce
                    break;
                case SauceType.Strawberry:
                    crc2.strokeStyle = "#FFC0CB"; // Rosa für Erdbeersauce
                    break;
            }
            // Dicke der Sauce-Streifen, Abrunden der Linen bei Ecken und Enden
            crc2.lineWidth = 3;
            crc2.lineJoin = "round";
            crc2.lineCap = "round";
            crc2.beginPath();
            // Zeichne zwei verkürzte Wellen-Streifen, verschoben nach oben und nach links
            this.drawSimpleSauceStreaks(crc2);
            crc2.stroke();
            crc2.restore();
        }
        drawSimpleSauceStreaks(crc2) {
            // Verschiebung nach oben und nach links
            const verticalOffset = -5;
            const horizontalOffset = -3;
            // Erste Welle
            crc2.moveTo(-10 + horizontalOffset, verticalOffset);
            crc2.quadraticCurveTo(-3 + horizontalOffset, verticalOffset - 5, 3 + horizontalOffset, verticalOffset);
            crc2.quadraticCurveTo(10 + horizontalOffset, verticalOffset + 5, 17 + horizontalOffset, verticalOffset);
            // Zweite Welle
            crc2.moveTo(-10 + horizontalOffset, verticalOffset + 6);
            crc2.quadraticCurveTo(-3 + horizontalOffset, verticalOffset + 1, 3 + horizontalOffset, verticalOffset + 6);
            crc2.quadraticCurveTo(10 + horizontalOffset, verticalOffset + 11, 17 + horizontalOffset, verticalOffset + 6);
        }
    }
    IceShop.Sauce = Sauce;
})(IceShop || (IceShop = {}));
//# sourceMappingURL=Sauce.js.map
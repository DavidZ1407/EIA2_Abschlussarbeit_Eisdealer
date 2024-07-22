namespace IceShop {
    // Enum für verschiedne Soßen-Typen
    export enum SauceType {
        Chocolate = "chocolate",
        Strawberry = "strawberry"
    }
    //Klasse für Soße, Position und Type
    export class Sauce {
        public position: Vector;
        public type: SauceType;

        // Konstruktor der Soßen-Klasse
        constructor(position: Vector, type: SauceType) {
            this.position = position;
            this.type = type;
        }
         // Methode zum Zeichnen der Sauce
        public draw(crc2: CanvasRenderingContext2D): void {
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

        private drawSimpleSauceStreaks(crc2: CanvasRenderingContext2D): void {
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
}
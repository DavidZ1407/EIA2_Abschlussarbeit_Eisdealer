namespace IceShop {
    // Klass Kunde, Position X u. Y, Stimmung, Farbe Körper, Ziel X u. Y, Bewegungs größe, Update von Zeit, Zeit wann Kunde aussehen ändert, Sitzen oder nicht
    export class Customer {
        public x: number;
        public y: number;
        public look: string; 
        public color: string; 
        private targetX: number | null = null;
        private targetY: number | null = null;
        private stepSize: number = 2;
        private lastUpdateTime: number = Date.now();
        private unwellAfter: number = 10000; 
        public seated: boolean; 
        // private state: "waiting" | "ordering" | "eating" |"paying"| "leaving";

        // Konstruktor zur Initialisierung(Vorbereitung) 
        constructor(x: number, y: number, look: string = "happy") {
            this.x = x;
            this.y = y;
            this.look = look;
            this.color = this.changeColor();
            this.seated = false; // Initialize seated to false
        }
        // Methode zur Generierung einer zufälligen Farbe im Hex-Format
        public changeColor(): string {
             // Array von möglichen Zeichen für einen Hex-Farbcode (0-9 und A-F)
            const intensity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "A", "B", "C", "D", "E", "F"];
             // Erzeugt eine zufällige Farbe im Hex-Format
            const randomColor = `#${intensity[Math.floor(Math.random() * intensity.length)]}${intensity[Math.floor(Math.random() * intensity.length)]}${intensity[Math.floor(Math.random() * intensity.length)]}${intensity[Math.floor(Math.random() * intensity.length)]}${intensity[Math.floor(Math.random() * intensity.length)]}${intensity[Math.floor(Math.random() * intensity.length)]}`;
            return randomColor;
        }

        // Methode zum Zeichnen des Kunden
        public draw(): void {
            crc2.fillStyle = this.color;
            crc2.fillRect(this.x, this.y, 30, 30);
            crc2.closePath();

            // Zeichnet das Gesicht des Kunden basierend auf Stimmung
            if (this.look === "happy") {
                this.drawHappyFace();
            } else if (this.look === "unwell") {
                this.drawUnwellFace();
            }
        }

        // Methode zum Zeichnen eines glücklichen Gesichts
        private drawHappyFace(): void {
            crc2.fillStyle = "#ffa78f";
            crc2.fillRect(this.x, this.y - 20, 30, 20); // Zeichnet das Gesicht
            crc2.fillStyle = "black";
            crc2.fillRect(this.x + 5, this.y - 15, 5, 5); // Linkes Auge
            crc2.fillRect(this.x + 20, this.y - 15, 5, 5); // Rechtes Auge
            crc2.beginPath();
            crc2.strokeStyle = "black";
            crc2.arc(this.x + 15, this.y - 10, 5, 0, Math.PI); // Zeichnet den Mund
            crc2.stroke();
            crc2.closePath();
        }

        // Methode zum Zeichnen eines unwohl aussehenden Gesichts
        private drawUnwellFace(): void {
            crc2.fillStyle = "red";
            crc2.fillRect(this.x, this.y - 20, 30, 20);
            crc2.fillStyle = "black";
            crc2.fillRect(this.x + 5, this.y - 15, 5, 5);
            crc2.fillRect(this.x + 20, this.y - 15, 5, 5);
            crc2.beginPath();
            crc2.strokeStyle = "black";
            crc2.arc(this.x + 15, this.y + -1, 5, Math.PI, 2 * Math.PI);
            crc2.stroke();
            crc2.closePath();
        }
         // Methode zum Bewegen des Kunden zu einem Ziel auf x u. y
        public moveTo(targetX: number, targetY: number): void {
            this.targetX = targetX;
            this.targetY = targetY;

        }
        // Methode zum Aktualisieren der Position des Kunden und sTIMMUNG
        public update(): void {
            let now = Date.now(); // Aktuelle Zeit
            if (this.targetX !== null && this.targetY !== null) {
                let dx = this.targetX - this.x;
                let dy = this.targetY - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy); // Berechnet die Distanz zum Ziel



                if (distance > this.stepSize) {
                    // Normalisiert die Richtung und bewegt den Kunden schrittweise
                    let stepX = (dx / distance) * this.stepSize;
                    let stepY = (dy / distance) * this.stepSize;

                    // Bewegung zum Target
                    this.x += stepX;
                    this.y += stepY;


                } else {
                    // Ziel erreicht
                    this.x = this.targetX;
                    this.y = this.targetY;
                    this.targetX = null;
                    this.targetY = null;

                }
            }

            // Überprüft, ob der Kunde unwohl werden soll
            if (now - this.lastUpdateTime > this.unwellAfter) {
                this.look = "unwell";
            }
        }
    }
}

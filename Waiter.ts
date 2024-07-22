namespace IceShop {
    // Klasse Kellner, Position, Position für Bewegung, Tragen vom Eis Elemente, Status Lieferung 
    export class Waiter {
        private position: Vector;
        private target: Vector | null = null;
        private carryingIceCream: IceCream | null = null;
        private carryingTopping: Topping | null = null; 
        private carryingSauce: Sauce | null = null; 
        private isDelivering: boolean = false; 


        // Konstruktor zum Initialisieren der Position des Kellner
        constructor(position: Vector) {
            this.position = position;
        }
        
        // Methode zum Bewegen des Waiters zu einem Ziel
        public moveTo(target: Vector): void {
            this.target = target;
            this.isDelivering = true; // Setze den Zustand, dass der Waiter liefert
        }

        // Methode zum Aufnehmen eines Eis
        public pickUpIceCream(iceCream: IceCream): void {
            this.carryingIceCream = iceCream;
        }

        // Methode zum Aufnehmen eines Toppings
        public pickUpTopping(topping: Topping): void { // Methode für Topping hinzufügen
            this.carryingTopping = topping;
        }

        // Methode zum Aufnehmen einer Sauce
        public pickUpSauce(sauce: Sauce): void { // Methode für Sauce hinzufügen
            this.carryingSauce = sauce;
        }

        // Update-Methode für die Bewegung des Waiters und das Abschließen von Lieferungen
        public update(): void {
            if (this.target) {
                // Berechnet die Richtung vom aktuellen Standort zum Ziel
                let direction = this.target.copy().subtract(this.position).normalize();
                this.position.add(direction);

                // Überprüft, ob der Waiter das Ziel erreicht hat
                if (this.position.distanceTo(this.target) < 1) {
                    this.position = this.target.copy();
                    this.target = null;

                    if (this.isDelivering) {
                        this.deliverItems(); // Lieferung abschließen
                    }
                }
            }
        }

        // Methode zum Abgeben der Items nach der Lieferung
        private deliverItems(): void {
            this.isDelivering = false;
            this.carryingIceCream = null; 
            this.carryingTopping = null; 
            this.carryingSauce = null; 
        }

        //Zeichnung von Kellner
        public drawHumans(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);

            //Körper
            crc2.fillStyle = "#ffa78f"; 
            crc2.fillRect(0, 0, 30, 50);

            //Augen
            crc2.fillStyle = "black";
            crc2.fillRect(5, 10, 5, 5); 
            crc2.fillRect(20, 10, 5, 5); 

            //Mund
            crc2.beginPath();
            crc2.strokeStyle = "black";
            crc2.arc(15, 18, 5, 0, 1 * Math.PI); 
            crc2.stroke();
            crc2.closePath();

            // Hemd 
            crc2.fillStyle = "white";
            crc2.fillRect(0, 30, 30, 30); 

            // Krawatte 
            crc2.fillStyle = "red";
            crc2.beginPath();
            crc2.arc(15, 33, 5, 0, 2 * Math.PI); 
            crc2.fill();
            crc2.closePath();

             // Zeichnet die Krawattenflügel
            crc2.beginPath();
            crc2.moveTo(15, 33);
            crc2.lineTo(5, 23);
            crc2.lineTo(5, 43); 
            crc2.fill();
            crc2.closePath();

            // Zeichnet die Beine des Waiters
            crc2.beginPath();
            crc2.moveTo(15, 33);
            crc2.lineTo(25, 23);
            crc2.lineTo(25, 43); 
            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.moveTo(0, 60);
            crc2.lineTo(30, 40);
            crc2.lineTo(30, 60); 
            crc2.fill();
            crc2.closePath();
            
            crc2.beginPath();
            crc2.moveTo(30, 60);
            crc2.lineTo(0, 40);
            crc2.lineTo(0, 60); 
            crc2.fill();
            crc2.closePath();

           // Stellt den vorherigen Zustand des Canvas-Kontexts wieder her
            crc2.restore();

            // Zeichne das Eis, wenn der Waiter es trägt
            if (this.carryingIceCream) {
                this.carryingIceCream.position = this.position.copy().add(new Vector(0, -30));
                this.carryingIceCream.draw(); // Methode ohne crc2-Parameter
            }

            // Zeichne das Topping, wenn der Waiter es trägt
            if (this.carryingTopping) {
                this.carryingTopping.position = this.position.copy().add(new Vector(0, -30));
                this.carryingTopping.draw(crc2); // Übergebe crc2 als Parameter
            }

            // Zeichne die Sauce, wenn der Waiter sie trägt
            if (this.carryingSauce) {
                this.carryingSauce.position = this.position.copy().add(new Vector(0, -30));
                this.carryingSauce.draw(crc2); // Übergebe crc2 als Parameter
            }
        }
    }
}

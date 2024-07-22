"use strict";
var IceShop;
(function (IceShop) {
    // Klasse Kellner, Position, Position für Bewegung, Tragen vom Eis Elemente, Status Lieferung 
    class Waiter {
        position;
        target = null;
        carryingIceCream = null;
        carryingTopping = null;
        carryingSauce = null;
        isDelivering = false;
        // Konstruktor zum Initialisieren der Position des Kellner
        constructor(position) {
            this.position = position;
        }
        // Methode zum Bewegen des Waiters zu einem Ziel
        moveTo(target) {
            this.target = target;
            this.isDelivering = true; // Setze den Zustand, dass der Waiter liefert
        }
        // Methode zum Aufnehmen eines Eis
        pickUpIceCream(iceCream) {
            this.carryingIceCream = iceCream;
        }
        // Methode zum Aufnehmen eines Toppings
        pickUpTopping(topping) {
            this.carryingTopping = topping;
        }
        // Methode zum Aufnehmen einer Sauce
        pickUpSauce(sauce) {
            this.carryingSauce = sauce;
        }
        // Update-Methode für die Bewegung des Waiters und das Abschließen von Lieferungen
        update() {
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
        deliverItems() {
            this.isDelivering = false;
            this.carryingIceCream = null;
            this.carryingTopping = null;
            this.carryingSauce = null;
        }
        //Zeichnung von Kellner
        drawHumans() {
            IceShop.crc2.save();
            IceShop.crc2.translate(this.position.x, this.position.y);
            //Körper
            IceShop.crc2.fillStyle = "#ffa78f";
            IceShop.crc2.fillRect(0, 0, 30, 50);
            //Augen
            IceShop.crc2.fillStyle = "black";
            IceShop.crc2.fillRect(5, 10, 5, 5);
            IceShop.crc2.fillRect(20, 10, 5, 5);
            //Mund
            IceShop.crc2.beginPath();
            IceShop.crc2.strokeStyle = "black";
            IceShop.crc2.arc(15, 18, 5, 0, 1 * Math.PI);
            IceShop.crc2.stroke();
            IceShop.crc2.closePath();
            // Hemd 
            IceShop.crc2.fillStyle = "white";
            IceShop.crc2.fillRect(0, 30, 30, 30);
            // Krawatte 
            IceShop.crc2.fillStyle = "red";
            IceShop.crc2.beginPath();
            IceShop.crc2.arc(15, 33, 5, 0, 2 * Math.PI);
            IceShop.crc2.fill();
            IceShop.crc2.closePath();
            // Zeichnet die Krawattenflügel
            IceShop.crc2.beginPath();
            IceShop.crc2.moveTo(15, 33);
            IceShop.crc2.lineTo(5, 23);
            IceShop.crc2.lineTo(5, 43);
            IceShop.crc2.fill();
            IceShop.crc2.closePath();
            // Zeichnet die Beine des Waiters
            IceShop.crc2.beginPath();
            IceShop.crc2.moveTo(15, 33);
            IceShop.crc2.lineTo(25, 23);
            IceShop.crc2.lineTo(25, 43);
            IceShop.crc2.fill();
            IceShop.crc2.closePath();
            IceShop.crc2.beginPath();
            IceShop.crc2.moveTo(0, 60);
            IceShop.crc2.lineTo(30, 40);
            IceShop.crc2.lineTo(30, 60);
            IceShop.crc2.fill();
            IceShop.crc2.closePath();
            IceShop.crc2.beginPath();
            IceShop.crc2.moveTo(30, 60);
            IceShop.crc2.lineTo(0, 40);
            IceShop.crc2.lineTo(0, 60);
            IceShop.crc2.fill();
            IceShop.crc2.closePath();
            // Stellt den vorherigen Zustand des Canvas-Kontexts wieder her
            IceShop.crc2.restore();
            // Zeichne das Eis, wenn der Waiter es trägt
            if (this.carryingIceCream) {
                this.carryingIceCream.position = this.position.copy().add(new IceShop.Vector(0, -30));
                this.carryingIceCream.draw(); // Methode ohne crc2-Parameter
            }
            // Zeichne das Topping, wenn der Waiter es trägt
            if (this.carryingTopping) {
                this.carryingTopping.position = this.position.copy().add(new IceShop.Vector(0, -30));
                this.carryingTopping.draw(IceShop.crc2); // Übergebe crc2 als Parameter
            }
            // Zeichne die Sauce, wenn der Waiter sie trägt
            if (this.carryingSauce) {
                this.carryingSauce.position = this.position.copy().add(new IceShop.Vector(0, -30));
                this.carryingSauce.draw(IceShop.crc2); // Übergebe crc2 als Parameter
            }
        }
    }
    IceShop.Waiter = Waiter;
})(IceShop || (IceShop = {}));
//# sourceMappingURL=Waiter.js.map
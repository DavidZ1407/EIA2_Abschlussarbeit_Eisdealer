namespace IceShop {
    // Enum für verschiedene Geschmacksrichtungen von Eis
    export enum FlavorType {
        Vanilla = "vanilla",
        Chocolate = "choco",
        Strawberry = "strawberry"
    }


    // Klasse für ein Eis, Position, Geschmacksrichtung, Anzahl Kugeln, Optional Container für Eisbehcer, Liste für Topings. Optonal Soße
    export class IceCream {
        public position: Vector;
        public type: FlavorType;
        public numScoops: number;
        public container: Container | null;
        public toppings: Topping[];
        public sauce: Sauce | null;

         // Konstruktor für die Klasse IceCream übergabe
        constructor(position: Vector, type: FlavorType, numScoops: number, container: Container | null = null, toppings: Topping[] = [], sauce: Sauce | null = null) {
            this.position = position;
            this.type = type;
            this.numScoops = numScoops;
            this.container = container;
            this.toppings = toppings;
            this.sauce = sauce;
        }
         // Methode zum Zeichnen des Eises
        public draw(): void {
            // Zeichne den Container, falls vorhanden
            if (this.container) {
                this.container.draw(crc2);
            }

            // Zeichne die Eiskugeln
            switch (this.type) {
                case FlavorType.Vanilla:
                    crc2.fillStyle = "#F3E5AB";
                    break;
                case FlavorType.Chocolate:
                    crc2.fillStyle = "#D2691E";
                    break;
                case FlavorType.Strawberry:
                    crc2.fillStyle = "#FC5A8D";
                    break;
            }
            // Zeichne die Eiskugeln
            for (let i = 0; i < this.numScoops; i++) {
                crc2.beginPath();
                crc2.arc(this.position.x, this.position.y - i * 15, 15, 0, 2 * Math.PI);
                crc2.fill();
            }

          // Zeichne die Toppings, falls vorhanden
            for (let topping of this.toppings) {
                topping.draw(crc2);
            }

            // Zeichne die Sauce, falls vorhanden
            if (this.sauce) {
                this.sauce.draw(crc2);
            }
        }
    }
}
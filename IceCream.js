"use strict";
var IceShop;
(function (IceShop) {
    // Enum für verschiedene Geschmacksrichtungen von Eis
    let FlavorType;
    (function (FlavorType) {
        FlavorType["Vanilla"] = "vanilla";
        FlavorType["Chocolate"] = "choco";
        FlavorType["Strawberry"] = "strawberry";
    })(FlavorType = IceShop.FlavorType || (IceShop.FlavorType = {}));
    // Klasse für ein Eis, Position, Geschmacksrichtung, Anzahl Kugeln, Optional Container für Eisbehcer, Liste für Topings. Optonal Soße
    class IceCream {
        position;
        type;
        numScoops;
        container;
        toppings;
        sauce;
        // Konstruktor für die Klasse IceCream übergabe
        constructor(position, type, numScoops, container = null, toppings = [], sauce = null) {
            this.position = position;
            this.type = type;
            this.numScoops = numScoops;
            this.container = container;
            this.toppings = toppings;
            this.sauce = sauce;
        }
        // Methode zum Zeichnen des Eises
        draw() {
            // Zeichne den Container, falls vorhanden
            if (this.container) {
                this.container.draw(IceShop.crc2);
            }
            // Zeichne die Eiskugeln
            switch (this.type) {
                case FlavorType.Vanilla:
                    IceShop.crc2.fillStyle = "#F3E5AB";
                    break;
                case FlavorType.Chocolate:
                    IceShop.crc2.fillStyle = "#D2691E";
                    break;
                case FlavorType.Strawberry:
                    IceShop.crc2.fillStyle = "#FC5A8D";
                    break;
            }
            // Zeichne die Eiskugeln
            for (let i = 0; i < this.numScoops; i++) {
                IceShop.crc2.beginPath();
                IceShop.crc2.arc(this.position.x, this.position.y - i * 15, 15, 0, 2 * Math.PI);
                IceShop.crc2.fill();
            }
            // Zeichne die Toppings, falls vorhanden
            for (let topping of this.toppings) {
                topping.draw(IceShop.crc2);
            }
            // Zeichne die Sauce, falls vorhanden
            if (this.sauce) {
                this.sauce.draw(IceShop.crc2);
            }
        }
    }
    IceShop.IceCream = IceCream;
})(IceShop || (IceShop = {}));
//# sourceMappingURL=IceCream.js.map
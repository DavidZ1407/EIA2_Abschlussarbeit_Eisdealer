"use strict";
var IceShop;
(function (IceShop) {
    // Enum für verschieden Belege-Typen
    let ToppingType;
    (function (ToppingType) {
        ToppingType["Sprinkles"] = "sprinkles";
        ToppingType["CookieChips"] = "cookies";
        ToppingType["HeavyCream"] = "cream";
    })(ToppingType = IceShop.ToppingType || (IceShop.ToppingType = {}));
    // Klasse für Topping, Position, Typ, Array für Streusel-Positionen, Keksstücke-Position
    class Topping {
        position;
        type;
        sprinkles = [];
        cookieChips = [];
        // Konstruktor der Topping-Klasse
        constructor(position, type) {
            this.position = position;
            this.type = type;
            // Generiere zufällige Positionen beim Erstellen von Sprinkles
            if (this.type === ToppingType.Sprinkles) {
                for (let i = 0; i < 10; i++) {
                    this.sprinkles.push({
                        x: Math.random() * 20 - 10,
                        y: Math.random() * 20 - 10
                    });
                }
            }
            // Generiere zufällige Positionen beim Erstellen von Cockie
            if (this.type === ToppingType.CookieChips) {
                for (let i = 0; i < 3; i++) {
                    this.cookieChips.push({
                        x: Math.random() * 20 - 10,
                        y: Math.random() * 20 - 10
                    });
                }
            }
        }
        // Zeichnung von Toppings
        draw(crc2) {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            // Zeichne das Topping basierend auf dem Typ
            switch (this.type) {
                case ToppingType.Sprinkles:
                    crc2.fillStyle = "#000000";
                    crc2.beginPath();
                    for (let sprinkle of this.sprinkles) {
                        crc2.fillRect(sprinkle.x, sprinkle.y, 2, 3); // Rechtecke für die Streusel
                    }
                    crc2.fill();
                    break;
                case ToppingType.CookieChips:
                    crc2.fillStyle = "#8B4513"; // Dunkelbraun für Cookies
                    for (let chip of this.cookieChips) {
                        crc2.beginPath();
                        crc2.arc(chip.x, chip.y, 5, 0, 2 * Math.PI); // Kreise für die Kekse
                        crc2.fill();
                    }
                    break;
                case ToppingType.HeavyCream:
                    crc2.fillStyle = "#FFF";
                    crc2.beginPath();
                    // Verschieben der Sahne
                    crc2.translate(0, -20);
                    // Sahne zeichnung
                    crc2.moveTo(0, 0);
                    crc2.bezierCurveTo(-10, 10, -20, 10, -15, 20); // Linke Kurve
                    crc2.bezierCurveTo(-10, 30, -5, 30, 0, 20); // obere Mitte
                    crc2.bezierCurveTo(5, 30, 10, 30, 15, 20); // rechte obere Kurve
                    crc2.bezierCurveTo(20, 10, 10, 10, 0, 0); // untere Mitte
                    crc2.closePath();
                    crc2.fill();
                    break;
            }
            crc2.restore(); //Stellt den vorherigen Zustand des Canvas-Kontexts wieder her
        }
    }
    IceShop.Topping = Topping;
})(IceShop || (IceShop = {}));
//# sourceMappingURL=Toppings.js.map
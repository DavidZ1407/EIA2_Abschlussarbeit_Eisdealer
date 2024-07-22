namespace IceShop {
    // Klasse Vektor mit x und y 
    export class Vector {
        x: number;
        y: number;

        // Konstruktor zum Erstellen eines Vektors mit den angegebenen x- und y-Werten
        constructor(_x: number, _y: number) {
            this.set(_x, _y);
        }

         // Methode zum Setzen der x- und y-Werte des Vektors
        set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y;
        }

        // Methode zum Skalieren des Vektors um einen bestimmten Faktor
        scale(_factor: number): void {
            this.x *= _factor;
            this.y *= _factor;
        }

        // Methode zum Addieren eines anderen Vektors zum aktuellen Vektor
        add(_addend: Vector): Vector {
            this.x += _addend.x;
            this.y += _addend.y;
            return this;
        }

        // Methode zum Subtrahieren eines anderen Vektors vom aktuellen Vektor
        subtract(_sub: Vector): Vector {
            this.x -= _sub.x;
            this.y -= _sub.y;
            return this;
        }

         // Methode zum Multiplizieren des Vektors mit einem Faktor und Zurückgeben eines neuen Vektors
        multiply(_factor: number): Vector {
            return new Vector(this.x * _factor, this.y * _factor);
        }

        // Methode zur Berechnung der Distanz zu einem anderen Vektor
        distanceTo(_vector: Vector): number {
            return Math.sqrt(Math.pow(this.x - _vector.x, 2) + Math.pow(this.y - _vector.y, 2));
        }

        // Methode zum Erstellen einer Kopie des aktuellen Vektors (Eis Bestellung)
        copy(): Vector {
            return new Vector(this.x, this.y);
        }

        // Methode zur Berechnung der Länge des Vektors
        length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        
        // Methode zur Normalisierung des Vektors (Vektorlänge auf 1 setzen)
        normalize(): Vector {
            const length = Math.sqrt(this.x * this.x + this.y * this.y);
            if (length > 0) {
                return new Vector(this.x / length, this.y / length);
            } else {
                return new Vector(0, 0); // Verhindert Division durch Null
            }
        }
    }
}
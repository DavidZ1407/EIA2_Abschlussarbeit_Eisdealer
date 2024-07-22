namespace IceShop {
    // Enum für die verschiedenen Behältertypen besser lesbar
    export enum ContainerType {
        Waffle = "waffle",    
        Papercup = "papercup" 
    }

    // Klasse für Behälter, Position , Typ Behälter 
    export class Container {
        position: Vector;      
        type: ContainerType;   

        // Konstruktor zur Initialisierung(Vorbereitung) des Behälter, setzen von Position und Typ
        constructor(position: Vector, type: ContainerType) {
            this.position = position; 
            this.type = type;         
        }

        // Methode zum Zeichnen des Behälter auf dem Canvas
        public draw(crc2: CanvasRenderingContext2D): void {
            crc2.save(); // Speichert den aktuellen Zustand des Zeichenkontexts

            crc2.translate(this.position.x, this.position.y); // Verschiebt den Ursprung des Koordinatensystems auf die Position des Containers

            // Zeichnen des Containers basierend auf dem Typ
            switch (this.type) {
                case ContainerType.Waffle: 
                    crc2.fillStyle = "#D2B48C"; 
                    crc2.beginPath(); 
                    crc2.moveTo(-15, 0); 
                    crc2.lineTo(15, 0);  
                    crc2.lineTo(0, 40);  
                    crc2.closePath();    
                    crc2.fill();         
                    break;

                    // Wenn der Container vom Typ Pappbecher ist zeichnung
                case ContainerType.Papercup: 
                    crc2.fillStyle = "#D3D3D3"; 
                    crc2.beginPath(); 
                    crc2.moveTo(-10, 0);  
                    crc2.lineTo(10, 0);   
                    crc2.lineTo(8, 30);   
                    crc2.lineTo(-8, 30);  
                    crc2.closePath();    
                    crc2.fill();         
                    break;
            }

            crc2.restore(); // Stellt den gespeicherten Zustand des Zeichenkontexts wieder her
        }
    }
}
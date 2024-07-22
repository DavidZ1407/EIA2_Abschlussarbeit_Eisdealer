namespace IceShop {
    // Event-Listener, der die Funktion handleLoad ausführt, wenn die Seite geladen ist
    window.addEventListener('load', handleLoad);

    // Zeichenkontext des Canvas, Speichern Image von Canvas
    export let crc2: CanvasRenderingContext2D;
    let imgData: ImageData;

    // Array für Stühle, Waiter, Customer, Aktuell ausgewähltes Eis, Topping, Sauce
    export let chairs: Chair[] = [];
    export let waiters: Waiter[] = [];
    export let customers: Customer[] = [];
    export let currentIceCream: IceCream | null = null;
    export let currentTopping: Topping | null = null;
    export let currentSauce: Sauce | null = null;

    //Konstante Stühle bereich, Kunden hinzufügen jede 10 sekunden
    const areaX = 450;
    const areaY = 50;
    const customerSpawnInterval = 10000; 

    // Funktion, die bei Seitenladeereignis aufgerufen wird, Holt das Canvas-Element aus dem DOMBeendet die Funktion, falls kein Canvas gefunden wurde
    function handleLoad(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas) return;

        //Initialisiert den Zeichenkontext des Canvas, Fülle das gesamte Canvas mit Weiß, Zeichne Background, Speicher Bilddaten von Canvas
        crc2 = canvas.getContext("2d")!;
        crc2.fillStyle = "#FFFFFF";
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height); 
        drawBackground();
        imgData = crc2.getImageData(0, 0, crc2.canvas.width, crc2.canvas.height);

        // Initialize chairs, Initialize waiter and customer
        initializeChairs();
        initializeWaitersAndCustomers();

        // Event listener für Kanvas klick
        canvas.addEventListener('click', handleCanvasClick);

        // Update wiederholung 
        window.setInterval(update, 20);

        // Setzt das Update-Intervall und den Timer für das Hinzufügen neuer Kunden
        window.setInterval(addNewCustomer, customerSpawnInterval);

        // Update-Funktion für die regelmäßige Aktualisierung des Zustands
        function update(): void {
            for (let waiter of waiters) {
                waiter.update();
            }
            for (let customer of customers) {
                customer.update();
            }
            redraw(); // Zeichnet das Canvas neu
        }

        // Handler für Klicks auf das Canvas, 
        function handleCanvasClick(event: MouseEvent): void {
            let rect = canvas!.getBoundingClientRect(); // Holt die Position des Canvas relativ zum Viewport
            let x = event.clientX - rect.left; // Berechnet die X-Position innerhalb des Canvas
            let y = event.clientY - rect.top;// Berechnet die Y-Position innerhalb des Canvas
            
            // Findet den nächsten Stuhl zum Klickpunkt
            let closestChair = findClosestChair(x, y);
            if (closestChair) {
                let availableCustomer = customers.find(c => !c.seated); // Finde ein Freien Platz
                if (availableCustomer) { 
                    availableCustomer.moveTo(closestChair.positionX + 1, closestChair.positionY + 1); // Weist den Kunden den Stuhl zu position x,y
                    availableCustomer.seated = true;  // Markiert den Kunden als sitzend
                }
            }
        }

          // Findet den nächsten Stuhl zum gegebenen Klickpunkt
        function findClosestChair(clickX: number, clickY: number): Chair | null {
            let closestChair: Chair | null = null;
            let minDistance = Infinity;

            // berechnung von der Mitte von Stuhl und entfernung
            for (let chair of chairs) {
                let chairCenterX = chair.positionX + 15;
                let chairCenterY = chair.positionY + 15;
                let distance = Math.sqrt((clickX - chairCenterX) ** 2 + (clickY - chairCenterY) ** 2);

                // Distanz Vergleicht
                if (distance < minDistance) {
                    minDistance = distance;
                    closestChair = chair;
                }
            }

            return closestChair;
        }

        // Zeichnet von Canvas neu und Elemente, Löschen von Canvas, Stellt die Hintergrundbilddaten wieder her mit Image Data, 
        function redraw(): void {
            crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
            crc2.putImageData(imgData, 0, 0);

            for (let chair of chairs) {
                chair.draw();
            }

            if (currentIceCream) {
                currentIceCream.draw();
            }

            if (currentIceCream && currentIceCream.container) {
                currentIceCream.container.draw(crc2);
            }

            if (currentTopping) {
                currentTopping.draw(crc2);
            }

            if (currentSauce) {
                currentSauce.draw(crc2);
            }

            for (let customer of customers) {
                customer.draw();
            }

            for (let waiter of waiters) {
                waiter.drawHumans();
            }
        }
        // Initialisiert eine vordefinierte Anzahl von Stühlen
        function initializeChairs(): void {
            chairs.push(new Chair(areaX + 300, areaY + 80));
            chairs.push(new Chair(areaX + 350, areaY + 150));
            chairs.push(new Chair(areaX + 280, areaY + 300));
            chairs.push(new Chair(areaX + 335, areaY + 250));
            chairs.push(new Chair(areaX - 250, areaY + 300));
            chairs.push(new Chair(areaX - 310, areaY + 240));
            chairs.push(new Chair(areaX - 250, areaY + 80));
            chairs.push(new Chair(areaX - 310, areaY + 150));
        }
         // Initialisiert einen Kellner und Kunden
        function initializeWaitersAndCustomers(): void {
            let waiter = new Waiter(new Vector(450, 250));
            waiters.push(waiter);

            let initialCustomerPosition = new Vector(450, crc2.canvas.height - 100);
            let customer = new Customer(initialCustomerPosition.x, initialCustomerPosition.y);
            customers.push(customer);
        }
         // Neue Kunden nach Zeit von Intervall 
        function addNewCustomer(): void {
            let initialCustomerPosition = new Vector(450, crc2.canvas.height - 100);
            let newCustomer = new Customer(initialCustomerPosition.x, initialCustomerPosition.y);
            customers.push(newCustomer);
        }

        // Handler Behälter Auswahl
        function handleContainerChange(event: Event): void {
            // Die Ziel-Element des Events, das den Container-Typ enthält, wird als HTMLSelectElement interpretiert.
            let target = event.target as HTMLSelectElement;
               // Der Wert des ausgewählten Containers wird in eine Enum-Konstante des Typs ContainerType umgewandelt
            let containerType = target.value as ContainerType;

            // Überprüfen, ob bereits ein IceCream-Objekt existiert.
            if (currentIceCream) {

                // Falls ein IceCream-Objekt existiert, wird das Container-Objekt in diesem IceCream aktualisiert.
                // Ein neues Container-Objekt wird erstellt und dem IceCream zugewiesen.
                currentIceCream.container = new Container(new Vector(475, 200), containerType);
            } else {
                 // Falls kein IceCream-Objekt existiert, wird ein neues IceCream-Objekt erstellt.
                 // Ein Container-Objekt wird erstellt und dem neuen IceCream zugewiesen.
                const container = new Container(new Vector(475, 200), containerType);
                currentIceCream = new IceCream(new Vector(475, 200), FlavorType.Vanilla, 1, container);
            }
            // Die Funktion redraw wird aufgerufen um überlappung zu vermeiden
            redraw();
        }
        //Handler Sorten Auswahl
        function handleFlavorChange(event: Event): void {
            let target = event.target as HTMLInputElement;
            let flavor = target.value as FlavorType;

            if (currentIceCream) {
                currentIceCream.type = flavor;
            } else {
                const container = new Container(new Vector(475, 200), ContainerType.Waffle);
                currentIceCream = new IceCream(new Vector(475, 200), flavor, 1, container);
            }
            redraw();
        }
        // Handler Topping Auswahl
        function handleToppingChange(event: Event): void {
            let target = event.target as HTMLInputElement;
            let toppingType = target.value as ToppingType;

            let topping = new Topping(new Vector(475, 200), toppingType);

            currentTopping = topping;
            redraw();
        }
        // Handler Soßen Auswahl
        function handleSauceChange(event: Event): void {
            let target = event.target as HTMLInputElement;
            let sauceType = target.value as SauceType;

            let sauce = new Sauce(new Vector(475, 200), sauceType);

            currentSauce = sauce;
            redraw();
        }
        // Handler Bestellen Button, Bediener nimmt Eis und übergibt es an Position Stühlen
        function handleOrder(): void {
            if (currentIceCream && waiters.length > 0) {
                let waiter = waiters[0];

                waiter.pickUpIceCream(currentIceCream);

                let chair = chairs[Math.floor(Math.random() * chairs.length)];

                waiter.moveTo(new Vector(chair.positionX, chair.positionY));

                redraw();
            }
        }

        //  Event handlers für Dorpdownmeü und Radio-Button zu wächseln 
        let containerSelect = document.getElementById('container') as HTMLSelectElement;
        containerSelect.addEventListener('change', handleContainerChange);

        let flavorRadios = document.querySelectorAll('input[name="icecream"]');
        flavorRadios.forEach(radio => {
            radio.addEventListener('change', handleFlavorChange);
        });

        let toppingRadios = document.querySelectorAll('input[name="toppings"]');
        toppingRadios.forEach(radio => {
            radio.addEventListener('change', handleToppingChange);
        });

        let sauceRadios = document.querySelectorAll('input[name="sauce"]');
        sauceRadios.forEach(radio => {
            radio.addEventListener('change', handleSauceChange);
        });

        let orderButton = document.querySelector("#order button") as HTMLButtonElement;
        orderButton.addEventListener('click', handleOrder);
    }
}



//Handler Kugel menge auswahl
// function handleScoopChange(event: Event): void {
//     let target = event.target as HTMLSelectElement;
//     let numScoops = parseInt(target.value);

//     if (currentIceCream) {
//         currentIceCream.numScoops = numScoops; // Update number of scoops
//     } else {
//         const container = new Container(new Vector(475, 200), ContainerType.Waffle);
//         currentIceCream = new IceCream(new Vector(475, 200), FlavorType.Vanilla, numScoops, container); // Default to vanilla flavor if none selected
//     }
//     redraw(); // Verwende redraw, um alles neu zu zeichnen



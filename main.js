"use strict";
var IceShop;
(function (IceShop) {
    // Event-Listener, der die Funktion handleLoad ausführt, wenn die Seite geladen ist
    window.addEventListener('load', handleLoad);
    let imgData;
    // Array für Stühle, Waiter, Customer, Aktuell ausgewähltes Eis, Topping, Sauce
    IceShop.chairs = [];
    IceShop.waiters = [];
    IceShop.customers = [];
    IceShop.currentIceCream = null;
    IceShop.currentTopping = null;
    IceShop.currentSauce = null;
    //Konstante Stühle bereich, Kunden hinzufügen jede 10 sekunden
    const areaX = 450;
    const areaY = 50;
    const customerSpawnInterval = 10000;
    // Funktion, die bei Seitenladeereignis aufgerufen wird, Holt das Canvas-Element aus dem DOMBeendet die Funktion, falls kein Canvas gefunden wurde
    function handleLoad() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        //Initialisiert den Zeichenkontext des Canvas, Fülle das gesamte Canvas mit Weiß, Zeichne Background, Speicher Bilddaten von Canvas
        IceShop.crc2 = canvas.getContext("2d");
        IceShop.crc2.fillStyle = "#FFFFFF";
        IceShop.crc2.fillRect(0, 0, IceShop.crc2.canvas.width, IceShop.crc2.canvas.height);
        IceShop.drawBackground();
        imgData = IceShop.crc2.getImageData(0, 0, IceShop.crc2.canvas.width, IceShop.crc2.canvas.height);
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
        function update() {
            for (let waiter of IceShop.waiters) {
                waiter.update();
            }
            for (let customer of IceShop.customers) {
                customer.update();
            }
            redraw(); // Zeichnet das Canvas neu
        }
        // Handler für Klicks auf das Canvas, 
        function handleCanvasClick(event) {
            let rect = canvas.getBoundingClientRect(); // Holt die Position des Canvas relativ zum Viewport
            let x = event.clientX - rect.left; // Berechnet die X-Position innerhalb des Canvas
            let y = event.clientY - rect.top; // Berechnet die Y-Position innerhalb des Canvas
            // Findet den nächsten Stuhl zum Klickpunkt
            let closestChair = findClosestChair(x, y);
            if (closestChair) {
                let availableCustomer = IceShop.customers.find(c => !c.seated); // Finde ein Freien Platz
                if (availableCustomer) {
                    availableCustomer.moveTo(closestChair.positionX + 1, closestChair.positionY + 1); // Weist den Kunden den Stuhl zu position x,y
                    availableCustomer.seated = true; // Markiert den Kunden als sitzend
                }
            }
        }
        // Findet den nächsten Stuhl zum gegebenen Klickpunkt
        function findClosestChair(clickX, clickY) {
            let closestChair = null;
            let minDistance = Infinity;
            // berechnung von der Mitte von Stuhl und entfernung
            for (let chair of IceShop.chairs) {
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
        function redraw() {
            IceShop.crc2.clearRect(0, 0, IceShop.crc2.canvas.width, IceShop.crc2.canvas.height);
            IceShop.crc2.putImageData(imgData, 0, 0);
            for (let chair of IceShop.chairs) {
                chair.draw();
            }
            if (IceShop.currentIceCream) {
                IceShop.currentIceCream.draw();
            }
            if (IceShop.currentIceCream && IceShop.currentIceCream.container) {
                IceShop.currentIceCream.container.draw(IceShop.crc2);
            }
            if (IceShop.currentTopping) {
                IceShop.currentTopping.draw(IceShop.crc2);
            }
            if (IceShop.currentSauce) {
                IceShop.currentSauce.draw(IceShop.crc2);
            }
            for (let customer of IceShop.customers) {
                customer.draw();
            }
            for (let waiter of IceShop.waiters) {
                waiter.drawHumans();
            }
        }
        // Initialisiert eine vordefinierte Anzahl von Stühlen
        function initializeChairs() {
            IceShop.chairs.push(new IceShop.Chair(areaX + 300, areaY + 80));
            IceShop.chairs.push(new IceShop.Chair(areaX + 350, areaY + 150));
            IceShop.chairs.push(new IceShop.Chair(areaX + 280, areaY + 300));
            IceShop.chairs.push(new IceShop.Chair(areaX + 335, areaY + 250));
            IceShop.chairs.push(new IceShop.Chair(areaX - 250, areaY + 300));
            IceShop.chairs.push(new IceShop.Chair(areaX - 310, areaY + 240));
            IceShop.chairs.push(new IceShop.Chair(areaX - 250, areaY + 80));
            IceShop.chairs.push(new IceShop.Chair(areaX - 310, areaY + 150));
        }
        // Initialisiert einen Kellner und Kunden
        function initializeWaitersAndCustomers() {
            let waiter = new IceShop.Waiter(new IceShop.Vector(450, 250));
            IceShop.waiters.push(waiter);
            let initialCustomerPosition = new IceShop.Vector(450, IceShop.crc2.canvas.height - 100);
            let customer = new IceShop.Customer(initialCustomerPosition.x, initialCustomerPosition.y);
            IceShop.customers.push(customer);
        }
        // Neue Kunden nach Zeit von Intervall 
        function addNewCustomer() {
            let initialCustomerPosition = new IceShop.Vector(450, IceShop.crc2.canvas.height - 100);
            let newCustomer = new IceShop.Customer(initialCustomerPosition.x, initialCustomerPosition.y);
            IceShop.customers.push(newCustomer);
        }
        // Handler Behälter Auswahl
        function handleContainerChange(event) {
            // Die Ziel-Element des Events, das den Container-Typ enthält, wird als HTMLSelectElement interpretiert.
            let target = event.target;
            // Der Wert des ausgewählten Containers wird in eine Enum-Konstante des Typs ContainerType umgewandelt
            let containerType = target.value;
            // Überprüfen, ob bereits ein IceCream-Objekt existiert.
            if (IceShop.currentIceCream) {
                // Falls ein IceCream-Objekt existiert, wird das Container-Objekt in diesem IceCream aktualisiert.
                // Ein neues Container-Objekt wird erstellt und dem IceCream zugewiesen.
                IceShop.currentIceCream.container = new IceShop.Container(new IceShop.Vector(475, 200), containerType);
            }
            else {
                // Falls kein IceCream-Objekt existiert, wird ein neues IceCream-Objekt erstellt.
                // Ein Container-Objekt wird erstellt und dem neuen IceCream zugewiesen.
                const container = new IceShop.Container(new IceShop.Vector(475, 200), containerType);
                IceShop.currentIceCream = new IceShop.IceCream(new IceShop.Vector(475, 200), IceShop.FlavorType.Vanilla, 1, container);
            }
            // Die Funktion redraw wird aufgerufen um überlappung zu vermeiden
            redraw();
        }
        //Handler Sorten Auswahl
        function handleFlavorChange(event) {
            let target = event.target;
            let flavor = target.value;
            if (IceShop.currentIceCream) {
                IceShop.currentIceCream.type = flavor;
            }
            else {
                const container = new IceShop.Container(new IceShop.Vector(475, 200), IceShop.ContainerType.Waffle);
                IceShop.currentIceCream = new IceShop.IceCream(new IceShop.Vector(475, 200), flavor, 1, container);
            }
            redraw();
        }
        // Handler Topping Auswahl
        function handleToppingChange(event) {
            let target = event.target;
            let toppingType = target.value;
            let topping = new IceShop.Topping(new IceShop.Vector(475, 200), toppingType);
            IceShop.currentTopping = topping;
            redraw();
        }
        // Handler Soßen Auswahl
        function handleSauceChange(event) {
            let target = event.target;
            let sauceType = target.value;
            let sauce = new IceShop.Sauce(new IceShop.Vector(475, 200), sauceType);
            IceShop.currentSauce = sauce;
            redraw();
        }
        // Handler Bestellen Button, Bediener nimmt Eis und übergibt es an Position Stühlen
        function handleOrder() {
            if (IceShop.currentIceCream && IceShop.waiters.length > 0) {
                let waiter = IceShop.waiters[0];
                waiter.pickUpIceCream(IceShop.currentIceCream);
                let chair = IceShop.chairs[Math.floor(Math.random() * IceShop.chairs.length)];
                waiter.moveTo(new IceShop.Vector(chair.positionX, chair.positionY));
                redraw();
            }
        }
        //  Event handlers für Dorpdownmeü und Radio-Button zu wächseln 
        let containerSelect = document.getElementById('container');
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
        let orderButton = document.querySelector("#order button");
        orderButton.addEventListener('click', handleOrder);
    }
})(IceShop || (IceShop = {}));
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
//# sourceMappingURL=main.js.map
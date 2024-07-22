namespace IceShop {
    export function drawBackground(): void {

        //Hintergrund, Wiese, Zeichnung (X,Y,Breite,Höhe)
        crc2.fillStyle = "#50C878";
        crc2.fillRect(0, 0, 1000, 500);
        //Boden Eisdiele
        crc2.fillStyle = "#33c0c4";
        crc2.fillRect(50, 50, 870, 400);

        //Wand
        crc2.fillStyle = "#c93d36";
        crc2.fillRect(50, 50, 850, 20);

        crc2.fillStyle = "#c93d36";
        crc2.fillRect(600, 450, 300, 20);

        crc2.fillStyle = "#c93d36";
        crc2.fillRect(50, 450, 350, 20);

        crc2.fillStyle = "#c93d36";
        crc2.fillRect(50, 50, 20, 400);

        crc2.fillStyle = "#c93d36";
        crc2.fillRect(900, 50, 20, 420);

        //Eistheke
        crc2.fillStyle = "#636363";
        crc2.fillRect(450, 200, 50, 45);

        //Bank linke obere Ecke
        crc2.fillStyle = "#7B3F00";
        crc2.fillRect(90, 90, 90, 30);
        crc2.fillRect(90, 90, 30, 100);

        //Bank rechte obere Ecke
        crc2.fillStyle = "#7B3F00";
        crc2.fillRect(780, 90, 90, 30);
        crc2.fillRect(850, 90, 30, 100);

        //Bank rechte untere Ecke
        crc2.fillStyle = "#7B3F00";
        crc2.fillRect(780, 400, 90, 30);
        crc2.fillRect(840, 300, 30, 100);

        //Bank linke untere Ecke
        crc2.fillStyle = "#7B3F00";
        crc2.fillRect(90, 400, 90, 30);
        crc2.fillRect(90, 300, 30, 100);

        //Tisch linke obere Ecke
        crc2.fillStyle = "#E97451";
        crc2.beginPath();
        crc2.arc(155, 155, 30, 0, 2 * Math.PI);
        crc2.fill();
        crc2.closePath();

        //Tisch rechte obere Ecke
        crc2.fillStyle = "#E97451";
        crc2.beginPath();
        crc2.arc(815, 160, 30, 0, 2 * Math.PI);
        crc2.fill();
        crc2.closePath();

        //Tisch rechte untere Ecke
        crc2.fillStyle = "#E97451";
        crc2.beginPath();
        crc2.arc(800, 365, 30, 0, 2 * Math.PI);
        crc2.fill();
        crc2.closePath();

       //Tisch untere untere Ecke
        crc2.fillStyle = "#E97451";
        crc2.beginPath();
        crc2.arc(155, 360, 30, 0, 2 * Math.PI);
        crc2.fill();
        crc2.closePath();

    }
}



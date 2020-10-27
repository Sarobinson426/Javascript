/**@type {HTMLCanvasElement} */

function experimental() {
    let canvas = document.getElementById('experiment');
    let context = canvas.getContext('2d');
    let cW = context.canvas.width, cH = context.canvas.height;

    function Background() {
        this.x = 0;
        this.y = 0;
        this.w = cW;
        this.h = cH;

        this.render = function() {
            context.fillStyle = 'black';
            context.fillRect(this.x, this.y, this.w, this.h);
        }
    }

    function draw_text() {
        context.font = 'bold 20px Arial, san-serif';
        context.textAlign = 'start';
        context.fillStyle = 'snow';
        context.fillText("Trigonometry Controls for Triangle Ship", 50, 50);
        context.fillText("A = Left", 50, 105);
        context.fillText("D = Right", 50, 165);
        context.fillText("W = Thruster", 50, 225);
    }

    const FPS = 30; // Frame Per Second - makes movement smooth (control)
    function Ship() {
        //position on screen (start)
        this.x = cW * 0.5;
        this.y = cH * 0.5;
        //angular movement
        this.a = (Math.PI * 0.5)
        this.rotation = 0;
        //forward movement
        this.thrusting = false;
        this.thrust_x = 0;
        this.thrust_y = 0;
        this.friction = 0.7;
        
        this.render = function() {
            this.a += this.rotation;

            if(this.thrusting == true) {
                this.thrust_x += Math.cos(this.a) * 7.5 / FPS;
                this.thrust_y -= Math.sin(this.a) * 7.5 / FPS;
            } 
            else {
                this.thrust_x -= this.friction * this.thrust_x / FPS;
                this.thrust_y -= this.friction * this.thrust_y /FPS;
            }
            this.x += this.thrust_x;
            this.y += this.thrust_y;

            context.strokeStyle = 'snow';
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(
                this.x + (Math.cos(this.a) * 20),
                this.y - (Math.sin(this.a) * 20)
            );
            context.lineTo(
                this.x - (Math.cos(this.a) + Math.sin(this.a)) * 13.2,
                this.y + (Math.sin(this.a) - Math.cos(this.a)) * 13.2
            );
            context.lineTo(
                this.x - (Math.cos(this.a) - Math.sin(this.a)) * 13.2,
                this.y + (Math.sin(this.a) + Math.cos(this.a)) * 13.2
            );
            context.closePath();
            context.stroke();

            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, 2, 2);

            //edge of screen
            if(this.x > cW - 5) {
                this.x = 0 - 5;
            } 
            else if (this.x < 0) {
                this.x = cW + 5;
            }
            if(this.y > cH + 5) {
                this.y = 0 - 5;
            }
            else if(this.y < 0 - 5) {
                this.y = cH + 5;
            }
        }
    }

    let ship = new Ship();
    let background = new Background();

    function animate() {
        context.save();
        context.clearRect(0, 0, cW, cH);

        background.render();
        draw_text();
        ship.render();
        
        context.restore();
    }
    let animateInterval = setInterval(animate, FPS);
    document.addEventListener('mousemove', function(event) {
        let mouse_x = event.clientX - context.canvas.offsetLeft;
        let mouse_y = event.clientY - context.canvas.offsetTop;
        let status = document.getElementById('status');
        status.innerHTML = mouse_x + " | " + mouse_y;
        });
    document.addEventListener('keydown', function(event) {
        switch(event.keyCode) {
            case 65: 
                ship.rotation = (2 * Math.PI * 0.025);
                break;
            case 68:
                ship.rotation = -(2 * Math.PI * 0.025);
                break;
            case 87:
                ship.thrusting = true;
                break;
        }
    });
    document.addEventListener('keyup', function(event) {
        switch(event.keyCode) {
            case 65: 
                ship.rotation = 0;
                break;
            case 68:
                ship.rotation = 0;
                break;
            case 87:
                ship.thrusting = false;
                break;
        }
    });
}

experimental();
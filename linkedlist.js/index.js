const express = require('express');

let app = express();
app.get('/', (request, response, next) => {
    response.sendFile('/public/index.html', { root: __dirname });
});
app.listen(5500, 'localhost', () => {
    console.log("Listening to requests...");
    
    var ll = new LinkedList();

    ll.append(1);
    ll.append(2);
    ll.append(3);
    ll.append(4);
    ll.append(5);
    ll.append(6);
    ll.append(7);
    ll.append(8);
    ll.append(9);
    ll.append(10);
    ll.print();
    ll.removeIndex(4);
    ll.print();
    ll.indexofElement(8);
});

class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(element) {
        var new_node = new Node(element);

        if(this.head == null) {
            this.head = new_node;
            return;
        } 

        var current = this.head;
        while(current.next) {
            current = current.next; 
        }

        current.next = new_node;
        this.size++;
    }
    removeIndex(del) {
        var current = this.head;
        var previous = null;
        var index = 0;

        if(this.head == null) {
            console.log("The list is empty");
            return;
        }
        while(current) {
            if(index == del) {
                previous.next = current.next;
                break;
            }
            index++;
            previous = current;
            current = current.next;
        }
        current = null;
        this.size--;
    }
    removeElement(element) {
        var current = this.head;
        var previous = null;
        
        if(this.head == null) {
            console.log("List is empty");
            return;
        }

        while(current != null) {
            if(current.element === element) {
                previous.next = current.next;
                return;
            }
            previous = current;
            current = current.next;
        }
        current = null;
        this.size--;
    }
    indexofElement(element) {
        var current = this.head;
        var index = 0;

        while(current != null) {
            if(current.element === element) {
                console.log("index: ", index);
                break;
            } else {
                index++;
                current = current.next;
            }
        }
    } 
    sizeofList() {
        console.log(this.size);
    }
    print() {
        var current = this.head;

        while(current) {
            console.log(current.element);
            current = current.next;
        }
    }
}
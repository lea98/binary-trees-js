var rootPosition = 120; //120 px od vrha ekrana je root

class Node { //deklaracija klase za crtanje jednog cvora, npr ako stavimo new Node(2,10,20) doda se cvor s brojem 2 na poziciju 10-20
    constructor(data, x, y) { //cosntructor - specijalna metoda koja kreira i inicijalizira objekt.
        this.data = data;
        this.left = null;
        this.right = null;

        this.h = 0; //koliko dice ima (dubina)
        /////ZA CRTANJE:///////
        this.n = document.createElement('div'); //kreira se div element
        this.n.innerHTML = data; //broj
        this.n.className = "node"; //dodavanje klase opisane u cssu
        this.node = this.n.style; //dodavanje css deklaracije cvora
        this.node.top = y + 'px'; //pozicioniranje na stranici. npr root je na 80 piksela
        this.node.left = x + 'px';//root na 441 px
        document.body.appendChild(this.n); //da se zalipi na stranicu
        return this;
    }

}



class BinarySearchTree {
    constructor() {
        this.root = null;
    }//metode:
    ////////Avl/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    insertAVL(data) { //dodavanje novog. prvo ide provjera da se ne bi doda i nacrta isti


        if (!this.isthere(this.root, data)) {
            alert("Element već postoji");

            return;
        }
        if (this.isZero(data)) {
            alert("Element ne može bit 0");

            return;
        }

        else if (this.root === null) {
            var newNode = new Node(data, window.innerWidth / 2, rootPosition);
            this.root = newNode;
            //alert("Element "+newNode.data+" postaje root");

        }
        else {
            this.root = this.insertNodeAVL(data, this.root, this.root.node.left, this.root.node.top);
            clearCanvas();

            ChangePos(this.root, window.innerWidth / 2, rootPosition);


        }

    }


    insertNodeAVL(val, node, x, y) {

        if (!node) {
            return new Node(val, x, y);
        }
        if (val < node.n.innerHTML) {
            node.left = this.insertNodeAVL(val, node.left, parseInt(node.node.left) - 50, parseInt(node.node.top) + 50);
        }
        else if (val > node.n.innerHTML) {
            node.right = this.insertNodeAVL(val, node.right, parseInt(node.node.left) + 50, parseInt(node.node.top) + 50);
        }
        else {
            return node;
        }
       
        return  this.Balance(val,node); //vraca balansirano stablo 

    }

    removeAVL(data) {

        this.root = this.deleteAVL(this.root, data);

        clearCanvas(); 
        ChangePos(this.root, window.innerWidth / 2, rootPosition); 

    }

    deleteAVL(node,key) {
       

       /* if (node === null) {
            return null;
        }*/ //ionako prije radimo provjeru

        if (key < node.data) {
            node.left = this.deleteAVL(node.left, key);
            
        }

        else if (key > node.data) {
            node.right = this.deleteAVL(node.right, key);
           
        }

        else {


            // bez djece
            if (node.left === null && node.right === null) {

                var temp = node;
                document.body.removeChild(temp.n);
                temp = null;

                return null;

            }

            // jedno dijete
            if (node.left === null) {

                var temp = node;
                node = node.right;
                document.body.removeChild(temp.n);

                temp = null;
                return node;
            }

            else if (node.right === null) {

                var temp = node;
                node = node.left;
                document.body.removeChild(temp.n);

                temp = null;
                return node;
            } 
            else { //dvoje djece

                //min u desnom il maks u livom nac-slucaj s oba djeteta.. mogu se samo vrijednosti zaminit.
                var temp = this.findMinNode(node.right);

                node.n.innerHTML = temp.n.innerHTML;

                node.data = temp.data;

                node.right = this.deleteAVL(node.right, temp.data); 
            }
        

        }
        var x=this.BalanceForDelete(node); //isto balansirat, drukcije nego kod inserta
        return x;   //vracanje balansiranog
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    insert(data) { //dodavanje novog. prvo ide provjera da se ne bi doda i nacrta isti


        if (!this.isthere(this.root, data)) { //isthere-vraca false ako postoji 
            alert("Element već postoji");

            return;
        }
        if (this.isZero(data)) { //isZero-true ako je 0
            alert("Element ne može bit 0");

            return;
        }

        else if (this.root === null) { //===This means both the type and the value we are comparing have to be the same
            var newNode = new Node(data, window.innerWidth / 2, rootPosition);
            this.root = newNode;
            //alert("Element "+newNode.data+" postaje root");

        }
        else {
            var newNode = new Node(data, window.innerWidth / 2, rootPosition);

            this.insertNode(this.root, newNode, parseInt(this.root.node.left), parseInt(this.root.node.top));
            clearCanvas();

            ChangePos(this.root, window.innerWidth / 2, rootPosition);


        }

    }


    insertNode(node, newNode, x, y) {


        if (newNode.data < node.data) {
            if (node.left === null) {
                node.left = newNode;


            }
            else
                this.insertNode(node.left, newNode, x - 50, y + 50); //pozicioniranje na ekranu, y+50 spusta se doli

        }


        else if (newNode.data > node.data) {
            if (node.right === null) {
                node.right = newNode;

            }
            else


                this.insertNode(node.right, newNode, x + 50, y + 50);
        }

        node.h = 1 + Math.max(Height(node.left), Height(node.right)); //azuriraj visine

    }
    isZero(data) {
        if (data == 0) {
            alert("Unos mora biti prirodan broj");
            return true;
        }
        else
            return false;
    }

    isthere(node, data) { //vraca false ako postoji

        if (node === null)
            return true;


        else if (data < node.data)
            return this.isthere(node.left, data);


        else if (data > node.data)
            return this.isthere(node.right, data);


        else
            return false;
    }
    find(node, data)  //slicno ka isthere al nam ova treba za tipku trazi element
    {
        if (node === null)
            return null;


        else if (data < node.data)
            return this.find(node.left, data);

        else if (data > node.data)
            return this.find(node.right, data);


        else
            return node;
    }

    inorder(node) { //pomocna funkcija za ispis na consoli
        if (node !== null) {
            this.inorder(node.left);
            console.log(node.data);
            this.inorder(node.right);
        }
    }
    ispis(node) { //ispis na dnu ekrana
        var poljeIspis = document.getElementById("poljeIspis");
        if (node !== null) {
            this.ispis(node.left);
            poljeIspis.innerHTML += node.data + '&nbsp;&nbsp;&nbsp;'
            this.ispis(node.right);
        }
    }

    ispisPreorder(node) { //ispis na dnu ekrana
        var poljeIspis = document.getElementById("poljeIspis");
        if (node !== null) {
            poljeIspis.innerHTML += node.data + '&nbsp;&nbsp;&nbsp;'

            this.ispisPreorder(node.left);
            this.ispisPreorder(node.right);
        }
    }
    ispisPostorder(node) { //ispis na dnu ekrana
        var poljeIspis = document.getElementById("poljeIspis");
        if (node !== null) {

            this.ispisPostorder(node.left);
            this.ispisPostorder(node.right);
            poljeIspis.innerHTML += node.data + '&nbsp;&nbsp;&nbsp;'

        }
    }


    // returns root of the tree 
    getRootNode() {
        return this.root;
    }


    findMinNode(node) {

        if (node.left === null)
            return node;
        else
            return this.findMinNode(node.left);
    }

    findMaxNode(node) {

        if (node.right === null)
            return node;
        else
            return this.findMaxNode(node.right);
    }





    remove(data) {

        this.root = this.delete(this.root, data);
        clearCanvas();

    ChangePos(this.root, window.innerWidth / 2, rootPosition); // da se promini na slici
        
    }


    delete(node, key) {

        if (node === null)
            return null;


        else if (key < node.data) {
            node.left = this.delete(node.left, key);
            return node;
        }

        else if (key > node.data) {
            node.right = this.delete(node.right, key);
            return node;
        }

        else {


            // deleting node with no children 
            if (node.left === null && node.right === null) {
                alert("Element " + node.data + " je izbrisan");

                var temp = node;
                document.body.removeChild(temp.n);
                temp = null;

                return null;

            }

            // deleting node with one children 
            if (node.left === null) {
                alert("Element " + node.data + " je izbrisan. Njegovo desno dijete " + node.right.data + " prelazi na njegovo mjesto");

                var temp = node;
                node = node.right;
                document.body.removeChild(temp.n);

                temp = null;
                return node;
            }

            else if (node.right === null) {
                alert("Element " + node.data + " je izbrisan. Njegovo lijevo dijete " + node.left.data + " prelazi na njegovo mjesto");

                var temp = node;
                node = node.left;
                document.body.removeChild(temp.n);

                temp = null;
                return node;
            }
            else {

                //min u desnom il maks u livom nac-slucaj s oba djeteta.. mogu se samo vrijednosti zaminit.
                var temp = this.findMinNode(node.right);
                alert("Element " + node.data + " je izbrisan. Minimalan element iz desnog podstabla " + temp.data + " prelazi na njegovo mjesto");

                node.n.innerHTML = temp.n.innerHTML;

                node.data = temp.data;

                node.right = this.deleteSec(node.right, temp.data);
                return node;
            }

        }

    }


    ///////////////////////////////////////////////////////////////////////////////////////////////

    // ista funkcija delete ali bez komentara (alert) za slucaj s 2 djeteta
    deleteSec(node, key) {

        if (node === null)
            return null;


        else if (key < node.data) {
            node.left = this.deleteSec(node.left, key);
            return node;
        }

        else if (key > node.data) {
            node.right = this.deleteSec(node.right, key);
            return node;
        }

        else {


            // deleting node with no children 
            if (node.left === null && node.right === null) {

                var temp = node;
                document.body.removeChild(temp.n);
                temp = null;

                return null;

            }

            // deleting node with one children 
            if (node.left === null) {

                var temp = node;
                node = node.right;
                document.body.removeChild(temp.n);

                temp = null;
                return node;
            }

            else if (node.right === null) {

                var temp = node;
                node = node.left;
                document.body.removeChild(temp.n);
                temp = null;
                return node;
            }
            else {

                //min u desnom il maks u livom nac-slucaj s oba djeteta.. mogu se samo vrijednosti zaminit.
                var temp = this.findMinNode(node.right);

                node.n.innerHTML = temp.n.innerHTML;

                node.data = temp.data;

                node.right = this.deleteSec(node.right, temp.data);
                return node;
            }
        }


    }



BalanceForDelete(node){
    node.h = 1 + Math.max(Height(node.left), Height(node.right));
    var balance = makingAVL(node);

    // left left rotation
    if (balance > 1 && makingAVL(node.left)>=0) {
        node = rightRotate(node);
        return node;
    }

    // right right rotation
    if (balance < -1 &&  makingAVL(node.right)<=0) {
        node = leftRotate(node);
        return node;
    }

    if (balance > 1 &&  makingAVL(node.left)<0) {
        node.left = leftRotate(node.left);
        node = rightRotate(node);
        return node;
    }

    // Right Left Case
     if (balance < -1 && makingAVL(node.right)>0) {
        node.right = rightRotate(node.right);
        node = leftRotate(node);
        return node;
    }
     
        return node;
}




    Balance(val,node){
    node.h = 1 + Math.max(Height(node.left), Height(node.right));
        var balance = makingAVL(node);

        // left left rotation
        if (balance > 1 && val < node.left.n.innerHTML) {
            node = rightRotate(node);
            return node;
        }

        // right right rotation
        else if (balance < -1 && val > node.right.n.innerHTML) {
            node = leftRotate(node);
            return node;
        }

        if (balance > 1 && val > node.left.n.innerHTML) {
            node.left = leftRotate(node.left);
            node = rightRotate(node);
            return node;
        }

        // Right Left Case
        if (balance < -1 && val < node.right.n.innerHTML) {
            node.right = rightRotate(node.right);
            node = leftRotate(node);
            return node;
        }
        return node;
    }

}



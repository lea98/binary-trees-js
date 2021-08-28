const bst = new BinarySearchTree(); //kreiranje objekta



function insertButton() {

  addNum = document.getElementById("Num");

  bst.insert(parseInt(Math.abs(addNum.value)));//salje se pozitivna cjelobrojna vrijednost

  var root = bst.getRootNode(); //getRootNode vraca this.root
  bst.inorder(root); //pomoc sa console

  addNum.value = "";

}
function findButton() {

  findNum = document.getElementById("Num");


  var root = bst.getRootNode();
  var x = bst.find(root, parseInt(Math.abs(findNum.value))); //vraca se cvor ako se nade

  if (x != null) {
    x.n.classList.add("foundNode"); //promjena boje u zutu i ispis
    alert("Element " + findNum.value + " je pronađen");
  }
  else
    alert("Element " + findNum.value + " nije pronađen");
  findNum.value = "";

}

function printButton() {


  var poljeIspis = document.getElementById("poljeIspis");
  poljeIspis.innerHTML += '<br>' + 'Inorder ispis' + '<br>'; //zalipit na dnu ekrana
  var root = bst.getRootNode();
  bst.inorder(root); //console
  bst.ispis(root); //ispis na ekranu
  alert("Ispisi su na dnu ekrana");

  poljeIspis.innerHTML += '<br>' + 'Preorder ispis' + '<br>'; //zalipit na dnu ekrana
  bst.ispisPreorder(root); //ispis na ekranu

  poljeIspis.innerHTML += '<br>' + 'Postorder ispis' + '<br>'; //zalipit na dnu ekrana
  bst.ispisPostorder(root); //ispis na ekranu
}

function minButton() {

  var root = bst.getRootNode();
  if (root != null) {
    var min = bst.findMinNode(root); //root se salje pomocnoj funkciji findMinNode u tree.js
    alert("Najmanji element je " + min.data);
  }
  else {
    alert("Stablo je prazno");
  }

}

function maxButton() {
  var root = bst.getRootNode();

  if (root != null) {
    var max = bst.findMaxNode(root);
    alert("Najveći element je " + max.data);

  }
  else {
    alert("Stablo je prazno");
  }


}


function deleteButton() {
  var deleteNum = document.getElementById("Num");
  var root = bst.getRootNode();

  if (!bst.isthere(root, deleteNum.value)) {


    bst.remove(parseInt(Math.abs(deleteNum.value)));
    
    bst.inorder(root);


    
  }
  else {
    alert("Element ne postoji");
  }
  deleteNum.value = "";

}

//////////////////////////////////////////AVL/////////////////////////////////////////////////////////
function insertButtonAVL() {
  addNum = document.getElementById("Num");

  bst.insertAVL(parseInt(Math.abs(addNum.value)));


  var root = bst.getRootNode();
  bst.inorder(root);

  addNum.value = ""; //izbrisi broj iz kucice za unos
  clearCanvas(); //brisi linije

  ChangePos(root, window.innerWidth / 2, rootPosition); // da se promini na slici



}

function deleteButtonAVL() {

  var deleteNum = document.getElementById("Num");
  var root = bst.getRootNode();

  if (!bst.isthere(root, deleteNum.value)) {


    bst.removeAVL(parseInt(Math.abs(deleteNum.value)));
    bst.inorder(root);
  }
  else {
    alert("Element ne postoji");
  }

  deleteNum.value = "";

}
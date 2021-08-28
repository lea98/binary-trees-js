var c = document.getElementById("canv");
var ctx = c.getContext("2d");

function drawLine(x1,y1,x2,y2){ /*zove se iz ChangePos, svaki put se pri promjeni crtaju nove veze*/
  
ctx.beginPath();
ctx.moveTo(x1+20, y1);
ctx.lineTo(x2+20, y2);
ctx.stroke();
}


function clearCanvas(){
ctx.clearRect(0, 0, c.width, c.height);
}
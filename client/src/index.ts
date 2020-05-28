

function main() {
  let webSketchCanvas : HTMLCanvasElement = document.getElementById("webSketchCanvas") as HTMLCanvasElement;
  let webSketchCanvas2D = webSketchCanvas.getContext("2d");
  webSketchCanvas2D.beginPath();
  webSketchCanvas2D.arc(95, 50, 40, 0, 2 * Math.PI);
  webSketchCanvas2D.stroke();
}

main();

class Board {
  private _canvas: HTMLCanvasElement;
  private _canvas2d: CanvasRenderingContext2D;

  private _startX: number;
  private _startY: number;

  constructor() {
    this._canvas = document.getElementById("webSketchCanvas") as HTMLCanvasElement;
    this._canvas2d = this._canvas.getContext("2d");

    this._setupDrawingBoard(this._canvas2d);
    this._setupEventHandler(this._canvas);
  }

  public start() {
    console.log("Canvas Board Loaded");
  }

  private _setupDrawingBoard(ctx2d: CanvasRenderingContext2D) {
    ctx2d.lineCap = "round";
    ctx2d.lineJoin = "round";
    ctx2d.strokeStyle = "black";
    ctx2d.lineWidth = 1;
  }

  private _setupEventHandler(ctx: HTMLCanvasElement) {
    ctx.addEventListener("mousedown", this.__mouseDownHandler.bind(this));
    ctx.addEventListener("mousemove", this.__mouseMoveHandler.bind(this));
    ctx.addEventListener("mouseup", this.__mouseUpHandler.bind(this));
    ctx.addEventListener("mouseout", this.__mouseoutHandler.bind(this));
  }

  private _drawBetween(ctx2d: CanvasRenderingContext2D,
               x1: number, y1: number, x2: number, y2: number) {
    ctx2d.beginPath();
    ctx2d.moveTo(x1, y1);
    ctx2d.lineTo(x2, y2);
    ctx2d.stroke();
  }

  private __mouseDownHandler(e: MouseEvent) {
    const canvasX = e.pageX - this._canvas.offsetLeft;
    const canvasY = e.pageY - this._canvas.offsetTop;
    this._startX = canvasX;
    this._startY = canvasY;
  }

  private __mouseMoveHandler(e: MouseEvent) {

  }

  private __mouseUpHandler(e: MouseEvent) {
    const canvasX = e.pageX - this._canvas.offsetLeft;
    const canvasY = e.pageY - this._canvas.offsetTop;

    this._drawBetween(this._canvas2d, this._startX, this._startY, canvasX, canvasY);
  }

  private __mouseoutHandler(e: MouseEvent)
  {
    const canvasX = e.pageX - this._canvas.offsetLeft;
    const canvasY = e.pageY - this._canvas.offsetTop;

    this._drawBetween(this._canvas2d, this._startX, this._startY, canvasX, canvasY);
  }
}

function main() {
  let b = new Board();
  b.start();
}

main();

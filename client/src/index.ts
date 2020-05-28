class Board {
  private _canvas: HTMLCanvasElement;
  private _canvas2d: CanvasRenderingContext2D;

  private _isDrawing: boolean;
  private _canvasX: number[];
  private _canvasY: number[];

  constructor() {
    this._canvas = document.getElementById("webSketchCanvas") as HTMLCanvasElement;
    this._canvas2d = this._canvas.getContext("2d");

    this._isDrawing = false;
    this._canvasX = [];
    this._canvasY = [];

    this._setupDrawingBoard(this._canvas2d);
    this._setupEventHandler(this._canvas);
  }

  public start() {
    console.log("Canvas Board Loaded");
    requestAnimationFrame(this.render.bind(this));
  }

  public render(timestamp: any) {
    if (this._canvasX.length > 0 && this._canvasY.length > 0) {
      for (let i = 0; i < this._canvasX.length - 1; i++) {
        this._drawBetween(this._canvas2d,
          this._canvasX[i], this._canvasY[i],
          this._canvasX[i+1], this._canvasY[i+1]);
      }

      if (this._isDrawing) {
        const lastX = this._canvasX[this._canvasX.length - 1];
        const lastY = this._canvasY[this._canvasY.length - 1];

        this._canvasX = [];
        this._canvasY = [];

        this._canvasX.push(lastX);
        this._canvasY.push(lastY);
      }
    }

    requestAnimationFrame(this.render.bind(this));
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

  private _drawBetween(
    ctx2d: CanvasRenderingContext2D,
    x1: number, y1: number,
    x2: number, y2: number)
  {
    ctx2d.beginPath();
    ctx2d.moveTo(x1, y1);
    ctx2d.lineTo(x2, y2);
    ctx2d.stroke();
  }

  private __mouseDownHandler(e: MouseEvent) {
    this._isDrawing = true;
    const canvasX = e.pageX - this._canvas.offsetLeft;
    const canvasY = e.pageY - this._canvas.offsetTop;
    this._canvasX.push(canvasX);
    this._canvasY.push(canvasY);
  }

  private __mouseMoveHandler(e: MouseEvent) {
    if (this._isDrawing) {
      const canvasX = e.pageX - this._canvas.offsetLeft;
      const canvasY = e.pageY - this._canvas.offsetTop;
      this._canvasX.push(canvasX);
      this._canvasY.push(canvasY);
    } else {
      this._canvasX = [];
      this._canvasY = [];
    }
  }

  private __mouseUpHandler(e: MouseEvent) {
    this._isDrawing = false;
  }

  private __mouseoutHandler(e: MouseEvent) {
    this._isDrawing = false;
  }
}


function main() {
  let b = new Board();
  b.start();
}

main();

import React, { useRef, useEffect } from "react";
import degToRad from "../../utils/degToRad";
import "./MainGraph.scss";

type MainGraphProps = {
  angle: number;
  viewTriangle: boolean;
  viewSin: boolean;
  viewCos: boolean;
  viewTan: boolean;
  viewCsc: boolean;
  viewCot: boolean;
  viewSec: boolean;
};
export default function MainGraph({
  angle,
  viewTriangle,
  viewSin,
  viewCos,
  viewCot,
  viewCsc,
  viewSec,
  viewTan,
}: MainGraphProps) {
  const canvasRef = useRef(null);
  // Constants
  const canvasSideLength = 670;
  const center = canvasSideLength / 2;
  const radius = 160;
  const markerHeight = 8;
  // Styling
  const sinAndCscColor = "#f33";
  const cosAndSecColor = "#55c400";
  const tanAndCotColor = "blue";

  useEffect(() => {
    // Constants
    const canvas = canvasRef.current;
    const XCoordOnCircle = center + radius * Math.cos(degToRad(360 - angle));
    const YCoordOnCircle = center + radius * Math.sin(degToRad(360 - angle));

    //@ts-ignore
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvasSideLength, canvasSideLength);
    // The triangle
    ctx.fillStyle = "#ccd";
    if (viewTriangle) {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(XCoordOnCircle, YCoordOnCircle);
      ctx.lineTo(XCoordOnCircle, center);
      ctx.lineTo(center, center);
      ctx.fill();
    }
    // Axes
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#ccc";
    ctx.beginPath();
    ctx.moveTo(0, center);
    ctx.lineTo(canvasSideLength, center);
    ctx.moveTo(center, 0);
    ctx.lineTo(center, canvasSideLength);
    ctx.stroke();
    // Markers
    ctx.strokeStyle = "#999";
    // x-2
    ctx.beginPath();
    ctx.moveTo(center - 2 * radius, center - markerHeight);
    ctx.lineTo(center - 2 * radius, center + markerHeight);
    // x-1
    ctx.moveTo(center - radius, center - markerHeight);
    ctx.lineTo(center - radius, center + markerHeight);
    // x+2
    ctx.moveTo(center + 2 * radius, center - markerHeight);
    ctx.lineTo(center + 2 * radius, center + markerHeight);
    // x+1
    ctx.moveTo(center + radius, center - markerHeight);
    ctx.lineTo(center + radius, center + markerHeight);
    // y+2
    ctx.moveTo(center - markerHeight, center - 2 * radius);
    ctx.lineTo(center + markerHeight, center - 2 * radius);
    // y-1
    ctx.moveTo(center - markerHeight, center - radius);
    ctx.lineTo(center + markerHeight, center - radius);
    // y+2
    ctx.moveTo(center - markerHeight, center + 2 * radius);
    ctx.lineTo(center + markerHeight, center + 2 * radius);
    // y+1
    ctx.moveTo(center - markerHeight, center + radius);
    ctx.lineTo(center + markerHeight, center + radius);
    ctx.stroke();
    // The main circle
    ctx.strokeStyle = "#ccc";
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 7);
    ctx.stroke();
    // The outer angle indicator
    ctx.strokeStyle = "#111";
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, degToRad(360 - angle), true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(XCoordOnCircle, YCoordOnCircle, 5, 0, 7);
    ctx.fill();
    // The inner angle indicator
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(center, center, 20, 0, degToRad(360 - angle), true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(XCoordOnCircle, YCoordOnCircle, 5, 0, 7);
    ctx.fill();
    // Hypotenuse
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(XCoordOnCircle, YCoordOnCircle);
    ctx.stroke();
    // Opposite / Sine
    ctx.lineWidth = 3;
    ctx.strokeStyle = sinAndCscColor;
    ctx.beginPath();
    ctx.moveTo(XCoordOnCircle, YCoordOnCircle);
    ctx.lineTo(XCoordOnCircle, center);
    if (viewSin) ctx.stroke();
    // Adjacent / Cosine
    ctx.strokeStyle = cosAndSecColor;
    ctx.beginPath();
    ctx.moveTo(XCoordOnCircle, YCoordOnCircle);
    ctx.lineTo(center, YCoordOnCircle);
    if (viewCos) ctx.stroke();
    // Tangent
    ctx.strokeStyle = tanAndCotColor;
    if (viewTan && angle !== 90 && angle !== 270) {
      ctx.beginPath();
      ctx.moveTo(XCoordOnCircle, YCoordOnCircle);
      ctx.lineTo(center + radius / Math.cos(degToRad(angle)), center);
      ctx.stroke();
    }
    // Cotangent (tan-1)
    ctx.setLineDash([5, 4]);
    if (viewCot && angle % 180) {
      ctx.beginPath();
      ctx.moveTo(XCoordOnCircle, YCoordOnCircle);
      ctx.lineTo(center, center + radius / Math.sin(degToRad(-angle)));
      ctx.stroke();
    }
    // Cosecant (sin-1)
    ctx.strokeStyle = sinAndCscColor;

    if (viewCsc && angle % 180) {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(center, center + radius / Math.sin(degToRad(-angle)));
      ctx.stroke();
    }
    // Secant (cos-1)
    ctx.strokeStyle = cosAndSecColor;
    if (viewSec && angle !== 90 && angle !== 270) {
      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.lineTo(center + radius / Math.cos(degToRad(-angle)), center);
      ctx.stroke();
    }
  }, [
    angle,
    viewSin,
    viewCos,
    viewTan,
    viewCsc,
    viewCot,
    viewSec,
    viewTriangle,
  ]);

  return (
    <div id="canvas-background">
      <p id="I" className="quadrant">
        I
      </p>
      <p id="II" className="quadrant">
        II
      </p>
      <p id="III" className="quadrant">
        III
      </p>
      <p id="IV" className="quadrant">
        IV
      </p>
      <canvas
        ref={canvasRef}
        width={canvasSideLength}
        height={canvasSideLength}
      />
    </div>
  );
}

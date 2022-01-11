import React, { useState, useEffect } from "react";
// Components
import MainGraph from "./components/MainGraph";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import * as Switch from "@radix-ui/react-switch";
import Identity from "./components/Identity";
// Utilities
import degToRad from "./utils/degToRad";
import degToRadInPi from "./utils/degToRadInPi";
import numOrUndefined from "./utils/numOrUndefined";

function App() {
  // States
  const [angle, setAngle] = useState(0);
  const [animated, setAnimated] = useState(true);
  const [displayRadians, setDisplayRadians] = useState(false);
  const [viewSin, setViewSin] = useState(true);
  const [viewCos, setViewCos] = useState(true);
  const [viewTan, setViewTan] = useState(true);
  const [viewCsc, setViewCsc] = useState(false);
  const [viewSec, setViewSec] = useState(false);
  const [viewCot, setViewCot] = useState(false);

  // Rotation
  useEffect(() => {
    if (!animated) return;
    const interval = setInterval(() => {
      if (angle === 359) return setAngle(0);
      setAngle(angle + 1);
    }, 40);
    return () => clearInterval(interval);
  }, [angle, animated]);

  return (
    <div className="App">
      <main>
        <MainGraph
          angle={angle}
          viewCos={viewCos}
          viewCot={viewCot}
          viewCsc={viewCsc}
          viewSec={viewSec}
          viewSin={viewSin}
          viewTan={viewTan}
        />
        <div className="controls">
          <div className="flex-center-between">
            <div className="flex-center-between" id="switch">
              <label htmlFor="animate">Animate</label>
              <Switch.Root
                checked={animated}
                defaultChecked
                id="animate"
                onCheckedChange={(checked) => {
                  setAnimated(checked);
                  setAngle(angle % 360);
                }}
              >
                <Switch.Thumb />
              </Switch.Root>
            </div>

            <ToggleGroup.Root
              type="single"
              value={displayRadians ? "radians" : "degrees"}
            >
              <ToggleGroup.Item
                value="degrees"
                onClick={() => setDisplayRadians(false)}
              >
                degrees
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="radians"
                onClick={() => setDisplayRadians(true)}
              >
                radians
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>
          <div className="flex-center-between">
            <ToggleGroup.Root
              type="single"
              value={animated ? "" : angle.toString()}
              onValueChange={(string) => {
                setAnimated(false);
                setAngle(Number(string));
              }}
            >
              <ToggleGroup.Item value="0">
                {displayRadians ? "0" : "0°"}
              </ToggleGroup.Item>
              <ToggleGroup.Item value="30">
                {displayRadians ? "𝜋/6" : "30°"}
              </ToggleGroup.Item>
              <ToggleGroup.Item value="45">
                {displayRadians ? "𝜋/4" : "45°"}
              </ToggleGroup.Item>
              <ToggleGroup.Item value="60">
                {displayRadians ? "𝜋/3" : "60°"}
              </ToggleGroup.Item>
              <ToggleGroup.Item value="90">
                {displayRadians ? "𝜋/2" : "90°"}
              </ToggleGroup.Item>
            </ToggleGroup.Root>
            <div className="flex-center-between">
              <input
                type="number"
                min={0}
                max={displayRadians ? 2 : 360}
                placeholder="custom"
                step={displayRadians ? 0.01 : 1}
                value={
                  animated
                    ? ""
                    : displayRadians
                    ? +(degToRad(angle) / Math.PI).toFixed(2)
                    : angle.toFixed(0)
                }
                onChange={(e) => {
                  setAnimated(false);
                  setAngle(
                    displayRadians
                      ? Math.round(Number(e.target.value) * 180)
                      : Number(e.target.value)
                  );
                }}
              />
              <p>&nbsp;{displayRadians ? "𝜋 rad" : "°"}</p>
            </div>
          </div>
          <div id="angle">
            <p>𝜃 = {displayRadians ? degToRadInPi(angle) : angle + "°"}</p>
          </div>
          <div className="identities-row">
            <Identity
              name="sine"
              value={numOrUndefined(Math.sin(degToRad(angle)))}
              view={viewSin}
              abbreviation="sin"
              description="opp/hyp"
              color="red"
              setView={setViewSin}
              animated={animated}
            />
            <Identity
              name="cosecant"
              value={numOrUndefined(1 / Math.sin(degToRad(angle)))}
              view={viewCsc}
              abbreviation="csc"
              description="sin⁻¹"
              color="red"
              dashed={true}
              setView={setViewCsc}
              animated={animated}
            />
          </div>
          <div className="identities-row">
            <Identity
              name="cosine"
              value={numOrUndefined(Math.cos(degToRad(angle)))}
              view={viewCos}
              abbreviation="cos"
              description="adj/hyp"
              color="#55c400"
              setView={setViewCos}
              animated={animated}
            />
            <Identity
              name="secant"
              value={numOrUndefined(1 / Math.cos(degToRad(angle)))}
              view={viewSec}
              abbreviation="sec"
              description="cos⁻¹"
              color="#55c400"
              dashed={true}
              setView={setViewSec}
              animated={animated}
            />
          </div>
          <div className="identities-row">
            <Identity
              name="tangent"
              value={numOrUndefined(Math.tan(degToRad(angle)))}
              view={viewTan}
              abbreviation="tan"
              description="opp/adj, sin/cos"
              color="blue"
              setView={setViewTan}
              animated={animated}
            />
            <Identity
              name="cotangent"
              value={numOrUndefined(1 / Math.tan(degToRad(angle)))}
              view={viewCot}
              abbreviation="cot"
              description="tan⁻¹"
              color="blue"
              dashed={true}
              setView={setViewCot}
              animated={animated}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

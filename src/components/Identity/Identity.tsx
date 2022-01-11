import React from "react";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import "./Identity.scss";
import { imageMap } from "../../utils/imageMap";

type IdentityProps = {
  angle: number;
  value: string | number;
  name: string;
  abbreviation: string;
  description?: string;
  view: boolean;
  setView(param: boolean): any;
  color: string;
  dashed?: boolean;
  animated: boolean;
};

export default function Identity({
  angle,
  value,
  name,
  abbreviation,
  description = "",
  view,
  setView,
  color,
  dashed = false,
  animated,
}: IdentityProps) {
  return (
    <div className="identity">
      <div
        style={{
          borderLeft: `3px ${dashed ? "dashed" : "solid"} ${
            view ? color : "lightgrey"
          }`,
          paddingLeft: "10px",
        }}
      >
        <div className="title">
          <h2>{abbreviation}</h2>
        </div>
        <p className="description">{name}</p>
        <p className="value">
          {value === "undefined" ? <i>undefined</i> : value}
        </p>
      </div>
      <img
        alt={""}
        src={
          !animated && imageMap[abbreviation][angle.toString()]
            ? `images/numbers/${imageMap[abbreviation][angle.toString()]}.png`
            : `images/numbers/none.png`
        }
      />
      <button
        className={`view-toggle ${view && "active"}`}
        onClick={() => {
          setView(!view);
        }}
      >
        {view ? <EyeOpenIcon /> : <EyeClosedIcon />}
      </button>
    </div>
  );
}

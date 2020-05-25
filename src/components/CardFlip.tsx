import ReactCardFlip from "react-card-flip";
import React, { useState } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import SingleCard from "./SingleCard";
import { AutoComplete } from "material-ui";

const useStyles = makeStyles({
  root: {
    marginTop: "1em",
    textAlign: "center",
    margin: "0 auto",
    // paddingTop: "3.5em",
  },
});

export default function CardFlip({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const classes = useStyles();
  const handleClick = (e) => {
    e.preventDefault();
    setIsFlipped((curState) => {
      return !curState;
    });
  };

  return (
    <>
      <div className={classes.root}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <div onClick={handleClick}>
            <SingleCard content={front}></SingleCard>
          </div>

          <div onClick={handleClick}>
            <SingleCard content={back} onClick={handleClick}></SingleCard>
          </div>
        </ReactCardFlip>
      </div>
    </>
  );
}

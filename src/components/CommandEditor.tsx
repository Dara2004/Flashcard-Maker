import React, { useState } from "react";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/yonce.css";
import "codemirror/mode/xml/xml";
import { UnControlled as CodeMirror } from "react-codemirror2";
import Tokenizer from "../lib/tokenizer";
import { deckCreationLiterals, allTokens } from "../lib/constants";
import COMMAND from "../ast/COMMAND";
import LIST from "../ast/LIST";
import COMPLEX_COMMAND from "../ast/COMPLEX_COMMAND";
import START_SESSION from "../ast/START_SESSION";
import HELP from "../ast/HELP";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const helpMsg = (
  <div
    style={{
      fontSize: "14px",
      lineHeight: "9px",
    }}
  >
    <h4>To start a session from decks:</h4>
    Start Session from [choose ‘random card’, ect ] from Decks: [choose 1 or
    more deck names]
    <h4>To start a session from tags:</h4>
    Start Session from [choose ‘random card’, ect ] from Tags: [choose 1 or more
    tag names]
    <h4>To show stats:</h4> Show stats for [choose one or more ‘best scores
    for’, ‘average time spent on’, ‘worst scores for’] Decks: [choose 1 or more
    deck names]
  </div>
);

type Props = { dispatch };

export default function CommandEditor(props: Props) {
  const [openHelp, setOpenHelp] = React.useState(false);

  const handleCloseHelp = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenHelp(false);
  };
  const handleCommandChange = (editor, data, value) => {
    if (!value.startsWith("> ")) {
      //reset the cursor if user tries to delete
      editor.getDoc().setValue("> ");
      editor.getDoc().setCursor(2);
    }

    if (value.includes("\n")) {
      let isHelpCommand = false;
      //after user hits enter, reset the cursor
      // Parse the value
      try {
        Tokenizer.makeTokenizer(value, allTokens);
        const command = new COMMAND();
        command.parse(); //commands = COMPLEX_COMMAND | HELP | LIST
        console.log(command.command);
        if ((command.command as LIST).option) {
          props.dispatch({ type: "list", command: value.trim() });
        } else if ((command.command as HELP).type === "help") {
          console.log(true);
          isHelpCommand = true;
        }
      } catch (err) {
        console.log(err);
      }
      if (isHelpCommand) {
        setOpenHelp(true);
        editor.getDoc().setValue("> ");
        editor.getDoc().setCursor(2);
      }
    }
  };

  return (
    <>
      <div className="command-editor">
        <CodeMirror
          // value={"> "}
          value={"> List: Decks"}
          options={{
            mode: "xml",
            theme: "yonce",
            lineNumbers: true,
          }}
          onChange={handleCommandChange}
        />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openHelp}
        autoHideDuration={180000}
        onClose={handleCloseHelp}
        message={helpMsg}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseHelp}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}

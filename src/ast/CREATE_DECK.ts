import NODE from "./NODE";
import DECK from "./DECK";
import TAGS from "./TAGS";
import STYLE from "./STYLE";

const invalidNameTokens = ["with Tags", "using Style", "("];

export default class CREATE_DECK extends NODE {
  // style: STYLE;
  tags: TAGS | null = null;
  style: STYLE | null = null;
  deck: DECK | null = null;
  name: string = "";

  checkForAndParseTags(): boolean {
    if (this.tokenizer.checkToken(new RegExp("with Tags"))) {
      this.tags = new TAGS();
      this.tags.parse();
      return true;
    }
    return false;
  }

  checkForAndParseStyle(): boolean {
    if (this.tokenizer.checkToken(new RegExp("using Style"))) {
      this.style = new STYLE();
      this.style.parse();
      return true;
    }
    return false;
  }

  parse() {
    //parse deck
    this.tokenizer.getAndCheckToken(new RegExp("Create Deck"));
    const name = this.tokenizer.getNext();
    if (invalidNameTokens.includes(name)) {
      throw new Error("invalid deck name");
    }
    this.name = name;
    if (this.checkForAndParseTags()) {
      this.checkForAndParseStyle();
    } else if (this.checkForAndParseStyle()) {
      this.checkForAndParseTags();
    }
    this.deck = new DECK();
    this.deck.parse();
  }

  evaluate() {
    // stub
    throw new Error("Not implemented");
  }
}

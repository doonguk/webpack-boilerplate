import { Child } from "components/Child";
import { SecondChild } from "components/SecondChild";

export default function App() {
  if (new.target !== App) {
    return new App();
  }

  this.init = () => {
    new Child();
    new SecondChild();
  };

  this.init();
}

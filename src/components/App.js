import { Child } from "./Child";
import { SecondChild } from "./SecondChild";

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

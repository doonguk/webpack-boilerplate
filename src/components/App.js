import { Child } from "./Child";

export default function App() {
  if (new.target !== App) {
    return new App();
  }

  this.init = () => {
    new Child();
  };

  this.init();
}

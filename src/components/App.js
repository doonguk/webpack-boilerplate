export default function App() {
  if (new.target !== App) {
    return new App();
  }

  this.init = () => {};

  this.init();
}

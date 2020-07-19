import "./index.scss";

export default function Child() {
  if (new.target !== Child) {
    return new Child();
  }

  this.init = () => {
    this.$target = document.querySelector("#App");
    this.$target.innerHTML = "<h1 class='first'>First Child</h1>";
  };

  this.init();
}

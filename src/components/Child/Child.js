import "./child.css";

export default function Child() {
  if (new.target !== Child) {
    return new Child();
  }

  this.init = () => {
    this.$target = document.querySelector("#App");
    this.$target.innerHTML = "<h1 class='title'>Hello Donuk</h1>";
  };

  this.init();
}

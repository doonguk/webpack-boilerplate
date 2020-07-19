export default function Child() {
  if (new.target !== Child) {
    return new Child();
  }

  this.init = () => {
    this.$target = document.querySelector("#App");
    this.$target.innerHTML = "Hello donguk";
  };

  this.init();
}

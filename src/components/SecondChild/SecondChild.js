import "./index.scss";

export default function SecondChild() {
  if (new.target !== SecondChild) {
    return new SecondChild();
  }

  this.init = () => {
    this.$target = document.querySelector("#App");

    const $h2 = document.createElement("h2");
    $h2.className = "second";
    $h2.innerHTML = "SecondChild";

    this.$target.appendChild($h2);
  };

  this.init();
}

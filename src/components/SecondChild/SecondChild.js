import "./index.scss";
import woowa from "imgs/woowabros.png";

export default function SecondChild() {
  if (new.target !== SecondChild) {
    return new SecondChild();
  }

  this.init = () => {
    this.$target = document.querySelector("#App");

    const $frag = document.createDocumentFragment();

    const $h2 = document.createElement("h2");
    $h2.className = "second";
    $h2.innerHTML = "SecondChild";
    $frag.appendChild($h2);

    const $img = document.createElement("img");
    $img.alt = "woowabros";
    $img.src = woowa;
    $frag.appendChild($img);

    this.$target.appendChild($frag);
  };

  this.init();
}

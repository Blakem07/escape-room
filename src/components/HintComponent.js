import "./inventory.css";

export default class HintComponent {
  constructor(hintText = "This is a hint!") {
    this.hintText = hintText;
    this.wrapper = document.createElement("div");
    this.wrapper.innerHTML = `
      <div class="invContainer showObj">
        <div class="headerBar">
          <h1 class="invHeader">Hint</h1>
        </div>
        <div class="invList">
          <ul>
            <li>item 1</li>
          </ul>
        </div>
      </div>`;

    const hintEle = this.wrapper.querySelector(".invList ul li");
    hintEle.textContent = hintText;
  }

  render() {
    return this.wrapper.firstElementChild;
  }
}

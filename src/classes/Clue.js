export default class Clue {
  constructor(name, information) {
    this.name = name;
    this.information = information;
    this.isFound = false;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    if (typeof newName === "string" && newName.trim() !== "") {
      this._name = newName;
    } else {
      console.error("Invalid name: Name must be a non-empty string.");
    }
  }
}

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

  get information() {
    return this._information;
  }

  set information(newInformation) {
    if (typeof newInformation === "string" && newInformation.trim() !== "") {
      this._information = newInformation;
    } else {
      console.error(
        "Invalid information: Information must be a non-empty string."
      );
    }
  }

  get isFound() {
    return this._isFound;
  }

  set isFound(found) {
    if (typeof found === "boolean") {
      this._isFound = found;
    } else {
      console.error(
        "Invalid isFound: isFound must be a boolean."
      );
    }
  }
}

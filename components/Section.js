export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.items = items;
    this.renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._rendererdItems.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

import UI from "../../classes/UI.js";
import {
  MenuComponent,
  LockComponent,
  ModalComponent,
} from "../../components/index.js";

/**
 * A visual test function to preview different popup components during the development stage.
 * Import to App.js and call within the App() function to view.
 *
 * @param {number} select - An index to select which popup to preview:
 * 0: MenuComponent, 1: LockComponent, 2: HintComponent, 3: InventoryComponent
 * @returns {void}
 */
export default function popupPreview(select = 0) {
  const ui = new UI();
  const menuComponent = new MenuComponent();
  const lockComponent = new LockComponent((e) => console.log(e));
  const modalComponent = new ModalComponent(
    "Sample Modal",
    "This is a sample modal body."
  );

  const popupConfigs = [
    {
      content: () => menuComponent.render(),
      overlay: () => ui.createImageOverlay(menuComponent.bgImage),
    },
    {
      content: () => lockComponent.render(),
      overlay: () => ui.createBlurOverlay(),
    },
    {
      content: () => modalComponent.render(),
      overlay: () => ui.createBlurOverlay(),
    },
  ];

  const { content, overlay } = popupConfigs[select];

  const testPopup = ui.createPopup({
    overlay,
    content,
    closeCallBack: ui.closePopup,
  });

  document.body.appendChild(testPopup);
}

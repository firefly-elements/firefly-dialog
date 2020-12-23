import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import { afterNextRender } from "@polymer/polymer/lib/utils/render-status.js";
import "@polymer/paper-dialog/paper-dialog.js";
import "@polymer/paper-button/paper-button.js";

import { FireflyDialogMixin } from "./firefly-dialog-mixin.js";

/**
 * `firefly-dialog` this component is responsible for displaying detail pages. These are
 * components that implement the AspComponentModelMixin and are tagged with the CSS class
 * ".detail-page".
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class FireflyDialog extends FireflyDialogMixin(PolymerElement) {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          --dialog-content-height: 400px;
          --dialog-title-color: rgba(15, 73, 169, 0.77);
          --dialog-width: 400px;
        }
        paper-dialog {
          --paper-dialog-background-color: white;
          width: var(--dialog-width);
        }

        paper-dialog > .dialog-content {
          margin-left: 10px;
          margin-right: 10px;
          overflow-y: scroll;
          height: var(--dialog-content-height);
        }

        paper-dialog > h2 {
          margin-left: 5px;
          font-size: 1.2em;
          color: var(--dialog-title-color);
        }
        paper-dialog > .buttons {
          font-size: 1em;
          color: #505050;
        }
      </style>

      <paper-dialog no-cancel-on-outside-click="" horizontal-offset="300">
        <h2>[[dialogLabel]]</h2>

        <div class="dialog-content">
          <slot id="detail" select=".detail-page"></slot>
        </div>
        <div class="buttons">
          <paper-button dialog-dismiss="">Cancel</paper-button>
          <paper-button
            dialog-confirm="[[closeOnAccept]]"
            autofocus=""
            on-tap="_addCard"
            >Accept</paper-button
          >
        </div>
      </paper-dialog>
    `;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
    return "firefly-dialog";
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized.
   */
  ready() {
    super.ready();

    afterNextRender(this, function () {});
  }
}

window.customElements.define(FireflyDialog.is, FireflyDialog);

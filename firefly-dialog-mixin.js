import { FlattenedNodesObserver } from "@polymer/polymer/lib/utils/flattened-nodes-observer.js";
import { matchesSelector } from "@polymer/polymer/lib/legacy/polymer.dom.js";

/**
 * This mixin is implemented by all firebase-related dialogs.
 * These dialogs have two modes: Add, and Edit which fire different
 * events depending on the mode they're in.
 *
 * @polymerMixin
 * @mixinFunction
 */
export const FireflyDialogMixin = (superclass) =>
  class extends superclass {
    static get properties() {
      return {
        /** The model for the dialog content */
        model: {
          type: Object,
          value: {},
        },

        /** The label for the dialog. */
        dialogLabel: {
          type: String,
          value: "",
        },

        /** Indicates whether the dialog is in 'Add' or 'Edit' mode. */
        mode: {
          type: String,
          value: "",
        },

        /**
         * Indicates the type of card to be added/edited.  This is used when you have a single
         * listener listening to the same type of event coming from multiple types of dialogs.
         */

        cardType: {
          type: String,
          value: "",
        },

        positionTarget: {
          type: String,
          value: "",
        },

        fitInto: {
          type: String,
          value: "",
        },
        disableClose: {
          type: Boolean,
          value: false,
        },
      };
    }

    /**
     * This function is usually called by the Accept button on a dialog, and is used to fire
     * a 'card-added' event.
     */
    _addCard() {
      let nodes = FlattenedNodesObserver.getFlattenedNodes(this);
      let assignedNodes = nodes.filter(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE && matchesSelector(n, ".detail-page")
      );
      let detail = assignedNodes[0];
      this.model = detail.model;

      if (this.mode == "Add" || this.mode == "") {
        this.dispatchEvent(
          new CustomEvent("card-added", {
            bubbles: true,
            composed: true,
            detail: {
              model: this.model,
              cardType: this.cardType,
            },
          })
        );
      } else {
        this.dispatchEvent(
          new CustomEvent("card-updated", {
            bubbles: true,
            composed: true,
            detail: {
              model: this.model,
              cardType: this.cardType,
            },
          })
        );
      }

      if (!this.disableClose) this.close();
    }

    /**
     * This method is used to initialize the dialog's model before opening the dialog.
     * This method should be called whenever the dialog is used to create a 'new' object.
     */
    init() {
      this.model = {};

      let nodes = FlattenedNodesObserver.getFlattenedNodes(this);
      let assignedNodes = nodes.filter(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE && matchesSelector(n, ".detail-page")
      );
      let detail = assignedNodes[0];

      detail.model = this.model;
    }

    /**
     * This method is responsible for displaying the dialog.
     */
    open() {
      this.mode = "Edit";
      let dialog = this.shadowRoot.querySelector("paper-dialog");
      dialog.open();
    }

    /**
     * This method is responsible for closing the dialog.
     */
    close() {
      let dialog = this.shadowRoot.querySelector("paper-dialog");
      dialog.close();
    }

    setModel(model) {
      this.model = model;

      let nodes = FlattenedNodesObserver.getFlattenedNodes(this);
      let assignedNodes = nodes.filter(
        (n) =>
          n.nodeType === Node.ELEMENT_NODE && matchesSelector(n, ".detail-page")
      );
      let detail = assignedNodes[0];
      detail.model = this.model;
    }

    /**
     * This variation of the open method initializes the model prior to opening the dialog.
     */
    newOpen() {
      this.mode = "Add";
      this.init();
      let dialog = this.shadowRoot.querySelector("paper-dialog");
      dialog.open();
    }
  };

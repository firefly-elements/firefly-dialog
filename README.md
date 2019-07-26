# <firefly-dialog\>

a visual component that displays a form used to create new records.

#Installation 

```
npm i @firefly-elements/firefly-dialog
```

## In an HTML file
```
<html>
   <head>
      <script type="module">
         import '@firefly-elements/firefly-dialog.js';
      </script>
   </head>
   <body>
      <firefly-dialog>
      </firefly-dialog>
   </body>
</html>
</body>
</html>
```

## In Polymer3

```
import {PolymerElement, html} from '@polymer/polymer';
import '@firefly-elements/firefly-dialog.js';
;

class SampleElement extends PolymerElement {
  static get template() {
    return html`
    <firefly-dialog></firefly-dialog>
    `;
  }
}
customElements.define('sample-element', SampleElement);

```

## Running the demo locally
```
$ polymer serve --open
```

## Running Tests
```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
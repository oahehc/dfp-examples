# dfp-examples

Examples about how to implement DFP (DoubleClick for Publishers) by using Vanilla Javascript, React, Vue and AMP.

---

## Reference

#### DFP official document

- [console for DFP: admanager](https://admanager.google.com)
- [element in admanager](https://support.google.com/admanager/answer/6012282)
- [API for DFP](https://developers.google.com/doubleclick-gpt/reference)
- [Avoiding Common mistakes](https://developers.google.com/doubleclick-gpt/common_implementation_mistakes)

#### AMP component for DFP

- [amp-ad doubleclick](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad-network-doubleclick-impl/amp-ad-network-doubleclick-impl-internal.md)

---

## Vanilla Javascript

[Javascript example](https://github.com/oahehc/dfp-examples/blob/master/Javascript/index.html)

We can generate script by using DFP console (admanager).

1. go to inventory > Ad units > Select the ad unit
2. click GENERATE TAGS
   ![Imgur](https://i.imgur.com/TrGr6Q2.png)

The scripts including three steps which list as below:

1. load gpt script

```html
<script
  async="async"
  src="https://www.googletagservices.com/tag/js/gpt.js"
></script>
```

2. define ad slot

```html
<script>
  var googletag = googletag || {};
  googletag.cmd = googletag.cmd || [];
</script>
<script>
  googletag.cmd.push(function() {
    googletag
      .defineSlot(
        '/21737763597/adunit-1',
        [320, 100],
        'div-gpt-ad-1559997122392-0',
      )
      .addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
  });
</script>
```

3. render ad element and display ad

```html
<div id="div-gpt-ad-1559997122392-0" style="height:100px; width:320px;">
  <script>
    googletag.cmd.push(function() {
      googletag.display('div-gpt-ad-1559997122392-0');
    });
  </script>
</div>
```

## AMP

[AMP example](https://github.com/oahehc/dfp-examples/blob/master/AMP/index.html)

implement DFP in AMP is pretty easy, just use amp-ad as below

1. import amp-ad component

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

2. add ad element

```html
<amp-ad
  width="320"
  height="100"
  type="doubleclick"
  data-slot="/21737763597/adunit-1"
>
</amp-ad>
```

But some DFP formats is not support in AMP

- Interstitials
- Flash
- Creatives served over HTTP.

## React

[React example](https://github.com/oahehc/dfp-examples/blob/master/reack-dfp)

Using DFP in React, just implement the three steps (load gpt script, define ad slot, render ad element and display ad). Here we use React hook to implement DFP. If you are not familiar with hook, can the document [here](https://reactjs.org/docs/hooks-intro.html).

1. load gpt script (public/index.html)

```html
<script
  async="async"
  src="https://www.googletagservices.com/tag/js/gpt.js"
></script>
```

2. Create a custom hook to define and display ad slot (src/useDfpSlot.js)

```javascript
const useDfpSlot = ({ path, size, id }) => {
  useEffect(() => {
    const googletag = window.googletag || {};

    googletag.cmd = googletag.cmd || [];
    googletag.cmd.push(function() {
      googletag.defineSlot(path, size, id).addService(googletag.pubads());
      googletag.pubads().enableSingleRequest();
      googletag.enableServices();
    });

    googletag.cmd.push(function() {
      googletag.display(id);
    });
  }, [path, size, id]);
};
```

3. render ad element (src/App.js)

```javascript
const App = () => {
  useDfpSlot({
    path: '/21737763597/adunit-1',
    size: [320, 100],
    id: 'div-gpt-ad-1559997122392-0',
  });

  return (
    <div
      id="div-gpt-ad-1559997122392-0"
      style={{ height: '100px', width: '320px' }}
    />
  );
};
```

## Vue

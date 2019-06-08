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

## Vanilla JavaScripts

We can generate script by using DFP console (admanager).

1. go to inventory > Ad units > Select the ad unit
2. click GENERATE TAGS
   ![Imgur](https://i.imgur.com/TrGr6Q2.png)

The scripts including 3 step which list as below:

- load gpt script

```html
<script
  async="async"
  src="https://www.googletagservices.com/tag/js/gpt.js"
></script>
```

- init gpt

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

- add ad element

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

implement DFP in AMP is pretty easy, just use amp-ad as below

- import amp-ad component

```html
<script
  async
  custom-element="amp-ad"
  src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
></script>
```

- add ad element

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

Using DFP in React, just apply 3 step (load gpt script, init gpt, add ad element)

## Vue

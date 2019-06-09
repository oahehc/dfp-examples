# dfp-examples

Examples about how to implement DFP (DoubleClick for Publishers) by using Vanilla Javascript, React, Vue and AMP.

---

## Vanilla Javascript

[Javascript example](https://github.com/oahehc/dfp-examples/blob/master/Javascript/index.html)

We can generate the script in DFP console (admanager).

1. go to inventory > Ad units > Select the ad unit
2. click GENERATE TAGS
   ![Imgur](https://i.imgur.com/TrGr6Q2.png)

The scripts including three steps which list as below:

1. load gpt (Google Publisher Tag) script

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

implement DFP in AMP is pretty easy, just use amp-ad as below:

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

[React example](https://github.com/oahehc/dfp-examples/blob/master/react-dfp)

Using DFP in React, just follow the three steps in vanilla javascript - load gpt script, define ad slot, render ad element and display ad.  
Here we use React hook to implement DFP. If you aren't familiar with hook, check the document [here](https://reactjs.org/docs/hooks-intro.html).

1. load gpt script

```html
<!-- @public/index.html -->
<script
  async="async"
  src="https://www.googletagservices.com/tag/js/gpt.js"
></script>
```

2. Create a custom hook to define and display ad slot

```javascript
// @src/useDfpSlot.js
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

3. render ad element

```javascript
// src/App.js
const App = () => {
  useDfpSlot({
    path: '/21737763597/adunit-1',
    size: [320, 100],
    id: 'div-gpt-ad-1559997122392-0',
  });

  return (
    <div
      id="div-gpt-ad-1559997122392-0"
      style={{ width: '320px', height: '100px' }}
    />
  );
};
```

## Vue

Because we don't have hook in Vue.js yet, so here we use component lifecycle hooks to handle DFP.

1. load gpt script

```html
<!-- @public/index.html -->
<script
  async="async"
  src="https://www.googletagservices.com/tag/js/gpt.js"
></script>
<script type="text/javascript">
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
</script>
```

2. render ad element, define and display ad slot in mounted hook  
   PS. destroySlots at beforeCreate hook to prevent define duplicate adUnit during hot reload

```html
<!-- @src/components/DfpSlot.vue -->
<template>
  <div :id="id"></div>
</template>

<script>
  export default {
    name: 'DfpSlot',
    props: {
      size: Array,
      path: String,
      id: String,
    },
    beforeCreate() {
      window.googletag.cmd.push(() => {
        window.googletag.destroySlots();
      });
    },
    mounted() {
      const { path, size, id } = this;
      window.googletag.cmd.push(() => {
        window.googletag
          .defineSlot(path, size, id)
          .addService(window.googletag.pubads());
        window.googletag.pubads().enableSingleRequest();
        window.googletag.enableServices();
        window.googletag.display(id);
      });
    },
  };
</script>
```

3. apply DfpSlot component

```html
<dfp-slot
  path="/21737763597/adunit-1"
  :size="[320, 100]"
  id="div-gpt-ad-1559997122392-0"
/>
```

---

### DFP API

---

## Reference

#### DFP official document

- [console for DFP: admanager](https://admanager.google.com)
- [element in admanager](https://support.google.com/admanager/answer/6012282)
- [API for DFP](https://developers.google.com/doubleclick-gpt/reference)
- [Avoiding Common mistakes](https://developers.google.com/doubleclick-gpt/common_implementation_mistakes)

#### AMP component for DFP

- [amp-ad doubleclick](https://github.com/ampproject/amphtml/blob/master/extensions/amp-ad-network-doubleclick-impl/amp-ad-network-doubleclick-impl-internal.md)

#### DFP in Vue.js

- [Google Publisher Tag for DFP in a Vue.js Single-Page Application](https://blog.jordinebot.me/posts/google-publisher-tag-dfp-vue-js-spa/)

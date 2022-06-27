# usage guide

- [Getting started](#getting-started)
  - [First step: setup](#first-step-setup)
  - [Second step: configure your container id](#configure-your-container-id)
- [Triggering and listening to costume events](#triggering-and-listening-to-costume-events)
## Getting started

### First step: setup

First include `playkit-google-tag-manager.js` **after** kaltura-player script in your web page.

```html
<script src="https://raw.githack.com/kaltura/kaltura-player-js/master/dist/kaltura-ovp-player.js"></script>
<script src="./playkit-google-tag-manager.js"></script>
```

Add the plugin name to the player config under the plugins section along with the rest of plugins.

```js
const config = {
    targetId: 'player-placeholder',
    provider: {
        partnerId: <your partner id>,
    },
    plugins: {
        'google-tag-manager': {},
    }
  };

const player = KalturaPlayer.setup(config);
```

### Second step: configure your container id (formatted as GTM-XXXXXX)

(Should be displayed on your admin tab in your [Google Tag Manager](https://tagmanager.google.com) dashboard)

```js
const config = {
  targetId: 'player-placeholder',
  provider: {
    partnerId: <your partner id>,
  },
  plugins: {
    'google-tag-manager': {
        containerId: 'GTM-XXXXXXX'
    },
  }
};

const player = KalturaPlayer.setup(config);
```

### Triggering and listening to costume events

In order to listening to player events - just pass array string to the plugin config

```js
const config = {
    ...
  },
  plugins: {
    'google-tag-manager': {
        containerId: 'GTM-XXXXXXX',
        costumeEvents: ['play', 'plaing', 'pause', 'seeked']
    },
  }
};
```
The full list of events can be found [here](https://github.com/kaltura/playkit-js/blob/master/src/event/event-type.js)

## Full example

[Full example](https://github.com/kaltura/playkit-js-google-tag-manager/blob/master/demo/index.html)

## Custom event trigger

[Custom event trigger](https://support.google.com/tagmanager/answer/7679219)

## About Player Events

[Player Events](https://github.com/kaltura/kaltura-player-js/blob/master/docs/events.md)

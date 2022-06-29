# Usage guide

- [Getting started](#getting-started)
  - [First step: setup](#first-step-setup)
  - [Second step: configure your container id](#configure-your-container-id)
- [Triggering costume events](#triggering-and-listening-to-costume-events)
- [Triggering Elements Clicks](#triggering-elements-clicks)
## Getting started

### First step: setup

First include the plugin script bundle **after** kaltura-player script in your web page.

```html
<script src="https://raw.githack.com/kaltura/kaltura-player-js/master/dist/kaltura-ovp-player.js"></script>
<script src="./playkit-google-tag-manager.js"></script>
```

Add the plugin name to the player config under the plugins section along with the rest of plugins.

```js
const config = {
    targetId: 'player-placeholder',
    provider: {
        partnerId: <YOUR PARTBER ID>,
    },
    plugins: {
        'google-tag-manager': {},
    }
  };

const player = KalturaPlayer.setup(config);
```

### Second step: configure your container id

Should be displayed on your admin tab in your [Google Tag Manager](https://tagmanager.google.com) dashboard (formatted as GTM-XXXXXX)

```js
const config = {
  targetId: 'player-placeholder',
  provider: {
    partnerId: <YOUR PARTBER ID>,
  },
  plugins: {
    'google-tag-manager': {
        containerId: <YOUR CONTAINER ID>
    },
  }
};

const player = KalturaPlayer.setup(config);
```

### Triggering and listening to costume events

In order to listen to player costume events - just pass string array to the plugin config

```js
const config = {
    ...
  },
  plugins: {
    'google-tag-manager': {
        containerId: 'GTM-XXXXXXX',
        costumeEvents: ['play', 'playing', 'pause', 'seeked', ...]
    },
  }
};
```
**The full list of events can be found [here](https://github.com/kaltura/playkit-js/blob/master/src/event/event-type.js)**

### Triggering elements clicks

In order to trigger Some Player Elements Clicks when condition of CSS selectors are true, 
You should only use the 'Click Classes' option of the conditions list, out elements do not contain
id's selector but only css classes

![Screen-Shot-GTM-Dashborrd-Trigger-Configuration](./images/Screen-Shot-GTM-Dashborrd-Trigger-Configuration.png)

####Use the following css class selectors:

| Control Element | Class Name                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------- |
| **PLAY**                              | `playkit-icon-play`                                                  |
| **PAUSE**                             | `playkit-icon-pause`                                                 |
| **PLAY**                              | `playkit-icon-rewind-10`                                             |
| **PAUSE**                             | `playkit-icon-forward-10`                                            |
| **VOLUME / MUTE**                     | `playkit-icon-volume-mute`                                           |
| **PLAY / PAUSE**                      | `playkit-control-play-pause`                                         |
| **SETTINGS**                          | `playkit-icon-settings`                                              |
| **PICTURE IN PICTURE**                | `playkit-control-picture-in-picture`                                 |
| **PICTURE IN PICTURE / START**        | `playkit-icon-picture-in-picture-star`                               |
| **PICTURE IN PICTURE / STOP**         | `playkit-icon-picture-in-picture-stop`                               |
| **FULLSCREEN / MAXIMIZE**             | `playkit-icon-maximize`                                              |
| **FULLSCREEN / MINIMIZE**             | `playkit-icon-minimize`                                              |

If you wnat to capture all player control just pass `playkit-icon` class

## Full example

[Full example](https://github.com/kaltura/playkit-js-google-tag-manager/blob/master/demo/index.html)

## Custom event trigger

[Custom event trigger](https://support.google.com/tagmanager/answer/7679219)

## About Player Events

[Player Events](https://github.com/kaltura/kaltura-player-js/blob/master/docs/events.md)

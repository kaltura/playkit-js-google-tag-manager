# Usage guide

- [Getting started](#getting-started)
  - [First step: setup](#first-step-setup)
  - [Second step: configure your container id](#configure-your-container-id)
- [Triggering Player Costume Events](#triggering-player-costume-events)
- [Triggering Player UI Elements Clicks](#triggering-elements-clicks)
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

### Triggering player costume events

In order to listen to player costume events - just pass string array of event types to the plugin config

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

In order get our costume event payload under the **Value** field in **Tag Configuration** tab,

Open your [Google Tag Manager](https://tagmanager.google.com) Workspace,

Go to: **Variables > User-Defined Variables > New > Choose variable type > Data Layer Variable** , and then put the string`'payload'`
under the **Data Layer Variable Name**  field.

Now, you can select thet variable from the list in the `Value` field on the `Tag Configuration` tab.



### Triggering player UI elements clicks

In order to trigger Some Player Elements Clicks when condition of CSS selectors are true,
You should use the 'Click Classes' option of the conditions list. 

Player elements do not contain id's selector but only css classes.

![Screen-Shot-GTM-Dashborrd-Trigger-Configuration](./images/Screen-Shot-GTM-Dashborrd-Trigger-Configuration.png)

#### Use the following css class selectors:

| Control Element | Class Name                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------- |
| **PLAY / PAUSE**                      | `playkit-control-play-pause`                                         |
| **PLAY**                              | `playkit-icon-play`                                                  |
| **PAUSE**                             | `playkit-icon-pause`                                                 |
| **REWIND**                            | `playkit-icon-rewind-10`                                             |
| **FORWARD**                           | `playkit-icon-forward-10`                                            |
| **VOLUME / MUTE**                     | `playkit-icon-volume-mute`                                           |
| **SETTINGS**                          | `playkit-icon-settings`                                              |
| **PICTURE IN PICTURE**                | `playkit-control-picture-in-picture`                                 |
| **PICTURE IN PICTURE / START**        | `playkit-icon-picture-in-picture-star`                               |
| **PICTURE IN PICTURE / STOP**         | `playkit-icon-picture-in-picture-stop`                               |
| **FULLSCREEN / MAXIMIZE**             | `playkit-icon-maximize`                                              |
| **FULLSCREEN / MINIMIZE**             | `playkit-icon-minimize`                                              |

If you wnat to capture all player control just pass `playkit-icon` class.

## Full example

[Full example](https://github.com/kaltura/playkit-js-google-tag-manager/blob/master/demo/index.html)

## Custom event trigger

[Custom event trigger](https://support.google.com/tagmanager/answer/7679219)

## About Player Events

[Player Events](https://github.com/kaltura/kaltura-player-js/blob/master/docs/events.md)

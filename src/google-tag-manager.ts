import { BasePlugin, EventTypes, FakeEvent, KalturaPlayer } from 'kaltura-player-js';
import { HEAD_TAG, BODY_TAG } from './gtm-tags';
import { GoogleTagManagerConfig } from './models/google-tag-manager-config';

export const pluginName = 'googleTagManager';

export const eventTypesMap: { [presetOption: string]: keyof EventTypes } = {
  coreEvents: 'Core',
  UIEvents: 'UI',
  playlistEvents: 'Playlist',
  castEvents: 'Cast'
};

export class GoogleTagManager extends BasePlugin<GoogleTagManagerConfig> {
  protected static defaultConfig = {
    customEventsTracking: {
      custom: [],
      preset: {
        coreEvents: false,
        UIEvents: false,
        playlistEvents: false,
        castEvents: false
      }
    }
  };

  private allPlayerEvents!: { [event: string]: string };

  constructor(name: string, player: KalturaPlayer, config: GoogleTagManagerConfig) {
    super(name, player, config);
    if (this.config.containerId.match(/^GTM-[A-Z1-9]{7}$/)) {
      this.loadTag();
      this.aggregatePlayerEvents();
      this.initCustomEventsListeners();
    } else {
      this.logger.error('Invalid container ID provided. Tracking aborted');
    }
  }

  private loadTag(): void {
    if (!document.getElementById(`kaltura-${this.config.containerId}`)) {
      // Adds the header tag
      const headScript = document.createElement('script');
      const headScriptCode = document.createTextNode(HEAD_TAG.replace('GTM-XXXXXX', this.config.containerId));
      headScript.appendChild(headScriptCode);
      headScript.id = `kaltura-${this.config.containerId}`;
      document.head.prepend(headScript);

      // Defines the the dataLayer object
      const dataLayerScript = document.createElement('script');
      const dataLayerScriptCode = document.createTextNode('window.dataLayer = window.dataLayer || [];');
      dataLayerScript.appendChild(dataLayerScriptCode);
      document.head.prepend(dataLayerScript);

      // Adds the body tag
      const template = document.createElement('template');
      template.innerHTML = BODY_TAG.replace('GTM-XXXXXX', this.config.containerId);
      document.body.prepend(template.content);
    } else {
      this.logger.warn('GTM Tag was already loaded');
    }
  }

  private initCustomEventsListeners(): void {
    // Prevents registering twice to the same event
    const trackedEvents = new Set(this.config.customEventsTracking.custom);

    for (const [presetOption, isTrackEnabled] of Object.entries<boolean>(this.config.customEventsTracking.preset)) {
      if (isTrackEnabled) {
        const eventType = eventTypesMap[presetOption];
        Object.values(this.player.Event[eventType]).forEach((customEvent) => {
          if (this.isNotHighFrequencyEvent(customEvent)) {
            trackedEvents.add(customEvent);
          }
        });
      }
    }
    trackedEvents.forEach((customEvent) => this.trackCustomEvent(customEvent));
  }

  private trackCustomEvent(customEvent: string): void {
    if (!(customEvent in this.allPlayerEvents)) {
      this.logger.warn(`'${customEvent}' is an invalid player event`);
      return;
    }
    this.eventManager.listen(this.player, customEvent, (event: FakeEvent) => {
      const dataLayerVariablePayload = event.payload !== undefined ? { [`${event.type}-payload`]: event.payload } : {};
      window.dataLayer.push({ event: event.type, ...dataLayerVariablePayload });
    });
  }

  private aggregatePlayerEvents(): void {
    const allPlayerEvents = {
      ...this.player.Event.Core,
      ...this.player.Event.UI,
      ...this.player.Event.Playlist,
      ...this.player.Event.Cast
    };
    this.allPlayerEvents = {};
    for (const key in allPlayerEvents) {
      this.allPlayerEvents[allPlayerEvents[key]] = key;
    }
  }

  private isNotHighFrequencyEvent(customEvent: string): boolean {
    return ![
      this.player.Event.Core.TIME_UPDATE,
      this.player.Event.Core.PROGRESS,
      this.player.Event.Core.FPS_DROP,
      this.player.Event.Core.FRAG_LOADED,
      this.player.Event.Core.AD_PROGRESS
    ].includes(customEvent);
  }

  public static isValid(): boolean {
    return true;
  }
}

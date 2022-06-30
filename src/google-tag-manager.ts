import { BasePlugin, FakeEvent, KalturaPlayer } from 'kaltura-player-js';
import { HEAD_TAG, BODY_TAG } from './gtm-tags';

export const pluginName = 'googleTagManager';

export interface GoogleTagManagerConfig {
  containerId: string;
  customEvents: string[];
}

export class GoogleTagManager extends BasePlugin<GoogleTagManagerConfig> {
  protected static defaultConfig = {
    costumeEvents: []
  };

  constructor(name: string, player: KalturaPlayer, config: GoogleTagManagerConfig) {
    super(name, player, config);
    if (this.config.containerId) {
      this.loadTag();
      this.initCostumeEventsListeners();
    } else {
      this.logger.error('No container ID provided. Tracking aborted');
    }
  }

  private loadTag(): void {
    if (this.config.containerId && !document.getElementById(`kaltura-${this.config.containerId}`)) {
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
    }
  }

  private initCostumeEventsListeners(): void {
    this.config.customEvents.forEach((event) => {
      this.eventManager.listen(this.player, event, (event: FakeEvent) => {
        window.dataLayer.push({ event: event.type, payload: event.payload });
      });
    });
  }

  public reset(): void {
    return;
  }

  public destroy(): void {
    this.reset();
  }

  public static isValid(): boolean {
    return true;
  }
}

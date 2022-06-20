import { BasePlugin, KalturaPlayer } from 'kaltura-player-js';

export const pluginName = 'google-tag-manager';

const HEAD_CODE =
  // eslint-disable-next-line max-len
  "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-XXXXXX');";
const BODY_CODE =
  // eslint-disable-next-line max-len
  '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXX" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>';

export interface GoogleTagManagerConfig {
  containerId: string;
}

export class GoogleTagManager extends BasePlugin<GoogleTagManagerConfig> {
  protected static defaultConfig = {};

  constructor(name: string, player: KalturaPlayer, config: GoogleTagManagerConfig) {
    super(name, player, config);
    if (this.config.containerId) {
      this.loadTag();
    } else {
      this.logger.warn('No container ID provided. Tracking aborted');
    }
  }

  private loadTag(): void {
    if (this.config.containerId && !document.getElementById(`kaltura-${this.config.containerId}`)) {
      // add header script
      const newScript = document.createElement('script');
      const inlineScript = document.createTextNode(HEAD_CODE.replace('GTM-XXXXXX', this.config.containerId));
      newScript.appendChild(inlineScript);
      newScript.id = `kaltura-${this.config.containerId}`;
      document.head.prepend(newScript);
      // add body script
      const template = document.createElement('template');
      template.innerHTML = BODY_CODE.replace('GTM-XXXXXX', this.config.containerId);
      document.body.prepend(template.content);
    }
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

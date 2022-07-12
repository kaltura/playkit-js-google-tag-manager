export interface GoogleTagManagerConfig {
  containerId: string;
  customEventsTracking: {
    custom: string[];
    preset: {
      coreEvents: boolean;
      UIEvents: boolean;
      playlistEvents: boolean;
      castEvents: boolean;
    };
  };
}

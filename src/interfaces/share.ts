import type { Component, Raw } from 'vue';

export type TButtonShare =
  | {
      icon: Raw<Component>;
      label: 'Copy';
      action: 'copy';
    }
  | {
      icon: Raw<Component>;
      label: string;
      action: string;
      url: string;
    };

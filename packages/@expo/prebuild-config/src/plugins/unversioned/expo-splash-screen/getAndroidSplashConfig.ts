import { ExpoConfig } from '@expo/config-types';

export type SplashScreenConfig = {
  xxxhdpi?: string | null;
  xxhdpi?: string | null;
  xhdpi?: string | null;
  hdpi?: string | null;
  mdpi?: string | null;
  image?: string | null;
  backgroundColor: string | null;
  resizeMode: 'contain' | 'cover' | 'native';
  dark?: {
    backgroundColor?: string;
    xxxhdpi?: string;
    xxhdpi?: string;
    xhdpi?: string;
    hdpi?: string;
    mdpi?: string;
    image?: string;
    resizeMode?: 'contain' | 'cover' | 'native';
  };
};

export type AndroidSplashConfig = {
  logoWidth?: number;
} & SplashScreenConfig;

const defaultResizeMode = 'contain';

export function getAndroidSplashConfig(
  config: Pick<ExpoConfig, 'splash' | 'android'>,
  props?: AndroidSplashConfig | null
): SplashScreenConfig | null {
  // Respect the splash screen object, don't mix and match across different splash screen objects
  // in case the user wants the top level splash to apply to every platform except android.
  if (props) {
    const splash = props;
    return {
      xxxhdpi: splash.xxxhdpi ?? splash.image ?? null,
      xxhdpi: splash.xxhdpi ?? splash.image ?? null,
      xhdpi: splash.xhdpi ?? splash.image ?? null,
      hdpi: splash.hdpi ?? splash.image ?? null,
      mdpi: splash.mdpi ?? splash.image ?? null,
      backgroundColor: splash.backgroundColor ?? null,
      resizeMode: splash.resizeMode ?? defaultResizeMode,
    };
  }

  if (config.android?.splash) {
    const splash = config.android?.splash;
    return {
      xxxhdpi: splash.xxxhdpi ?? splash.image ?? null,
      xxhdpi: splash.xxhdpi ?? splash.image ?? null,
      xhdpi: splash.xhdpi ?? splash.image ?? null,
      hdpi: splash.hdpi ?? splash.image ?? null,
      mdpi: splash.mdpi ?? splash.image ?? null,
      backgroundColor: splash.backgroundColor ?? null,
      resizeMode: splash.resizeMode ?? defaultResizeMode,
    };
  }

  if (config.splash) {
    const splash = config.splash;
    return {
      xxxhdpi: splash.image ?? null,
      xxhdpi: splash.image ?? null,
      xhdpi: splash.image ?? null,
      hdpi: splash.image ?? null,
      mdpi: splash.image ?? null,
      backgroundColor: splash.backgroundColor ?? null,
      resizeMode: splash.resizeMode ?? defaultResizeMode,
    };
  }

  return null;
}

export function getAndroidDarkSplashConfig(
  config: Pick<ExpoConfig, 'splash' | 'android'>,
  props: AndroidSplashConfig | null
): SplashScreenConfig | null {
  if (props?.dark) {
    const splash = props.dark;
    const lightTheme = getAndroidSplashConfig(config, props);
    return {
      xxxhdpi: splash.xxxhdpi ?? splash.image ?? null,
      xxhdpi: splash.xxhdpi ?? splash.image ?? null,
      xhdpi: splash.xhdpi ?? splash.image ?? null,
      hdpi: splash.hdpi ?? splash.image ?? null,
      mdpi: splash.mdpi ?? splash.image ?? null,
      backgroundColor: splash.backgroundColor ?? null,
      resizeMode: lightTheme?.resizeMode ?? defaultResizeMode,
    };
  }

  // Respect the splash screen object, don't mix and match across different splash screen objects
  // in case the user wants the top level splash to apply to every platform except android.
  if (config.android?.splash?.dark) {
    const splash = config.android?.splash?.dark;
    const lightTheme = getAndroidSplashConfig(config, props);
    return {
      xxxhdpi: splash.xxxhdpi ?? splash.image ?? null,
      xxhdpi: splash.xxhdpi ?? splash.image ?? null,
      xhdpi: splash.xhdpi ?? splash.image ?? null,
      hdpi: splash.hdpi ?? splash.image ?? null,
      mdpi: splash.mdpi ?? splash.image ?? null,
      backgroundColor: splash.backgroundColor ?? null,
      // Can't support dark resizeMode because the resize mode is hardcoded into the MainActivity.java
      resizeMode: lightTheme?.resizeMode ?? defaultResizeMode,
    };
  }

  return null;
}

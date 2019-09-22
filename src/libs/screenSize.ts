export const SCREEN_SIZE = {
  XS: 576,
  SM: 768,
  MD: 992,
  LG: 1200,
  XL: 1600,
};

export const isScreenSize = {
  xs: () => window.innerWidth < SCREEN_SIZE.XS,
  sm: () =>
    window.innerWidth < SCREEN_SIZE.SM && window.innerWidth >= SCREEN_SIZE.XS,
  md: () =>
    window.innerWidth < SCREEN_SIZE.MD && window.innerWidth >= SCREEN_SIZE.SM,
  lg: () =>
    window.innerWidth < SCREEN_SIZE.LG && window.innerWidth >= SCREEN_SIZE.MD,
  xl: () => window.innerWidth < SCREEN_SIZE.XL,
  smallerThan: (size: number) => {
    return window.innerWidth < size;
  },
  largerThan: (size: number) => {
    return window.innerWidth > size;
  },
};

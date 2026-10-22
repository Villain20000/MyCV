if (typeof window.matchMedia !== 'function') {
  const noop = (): void => undefined;

  window.matchMedia = (query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: noop,
    removeEventListener: noop,
    addListener: noop,
    removeListener: noop,
    dispatchEvent: () => false,
  });
}

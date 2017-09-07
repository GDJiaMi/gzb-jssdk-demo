interface Window {
  Intl: object
}

declare module 'intl' {
  const polyfill: object
  export = polyfill
}

declare module 'intl/locale-data/jsonp/en' {
  const polyfill: object
  export = polyfill
}

declare module 'intl/locale-data/jsonp/zh' {
  const polyfill: object
  export = polyfill
}

// svg sprite
declare module '*.svg' {
  const value: {
    viewBox: string
    id: string
    content: string
  }

  export = value
}

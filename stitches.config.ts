import {createCss} from '@stitches/react'

export const {css, styled, global, theme, keyframes, getCssString} = createCss({
  prefix: '',
  theme: {},
  themeMap: {},
  utils: {},
  media: {
    'bp1': '(min-width: 640px)',
    'bp2': '(min-width: 768px)',
    'bp3': '(min-width: 1024px)',
  },
})
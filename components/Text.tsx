import { styled } from '../stitches.config'

export const Text = styled.span({
  // Reset
  lineHeight: '1',
  margin: '0',
  fontWeight: 400,

  // Custom
  color: '$hiContrast',

  variants: {
    fontWeight: {
      bold: {
        fontWeight: 600,
      },
    },
    size: {
      '1': {
        fontSize: '$1',
      },
      '2': {
        fontSize: '$2',
      },
      '3': {
        fontSize: '$3',
      },
      '4': {
        fontSize: '$4',
      },
      '5': {
        fontSize: '$5',
      },
      '6': {
        fontSize: '$6',
        letterSpacing: '-.012em',
      },
      '7': {
        fontSize: '$7',
        letterSpacing: '-.021em',
      },
      '8': {
        fontSize: '$8',
        letterSpacing: '-.034em',
      },
      '9': {
        fontSize: '$9',
        letterSpacing: '-.055em',
      },
    },
  },
})

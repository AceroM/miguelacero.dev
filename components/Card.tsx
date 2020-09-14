import { styled } from '../stitches.config'

export const Card = styled.div({
  // Reset
  boxSizing: 'border-box',
  flexShrink: 0,

  // Custom
  linearGradient: '90deg, red 40%, white 40%, white 60%, blue 60%',
  border: '1px solid $gray400',
  borderRadius: '$2',
})

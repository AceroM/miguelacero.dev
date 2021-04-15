import tw from 'twin.macro'
import {styled} from '../stitches.config'

const Text = styled('p', {
  ...tw`text-base`,
  variants: {
    size: {
    }
  }
})

export default Text
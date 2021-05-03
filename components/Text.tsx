import tw from 'twin.macro'
import {styled} from '../stitches.config'
import { a as web } from '@react-spring/web'

const Text = styled('p', {
  ...tw`text-base`,
  variants: {
    size: {
    }
  }
})

export const ThreeDLabel = styled(web.div, {
  ...tw`fixed flex flex-col justify-center w-full items-center`,
  width: 600,
  top: '53%',
  left: '50%',
  transform: 'translate3d(-50%, 50%, 0)',
})

export default Text
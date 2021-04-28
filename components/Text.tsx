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

export const ThreeDLabel = styled(web.h1, {
  ...tw`fixed flex justify-center w-full`,
  top: '69%',
  left: '50%',
  transform: 'translate3d(-50%, 50%, 0)'
})

export const WordArt = styled('p', {
  ...tw``,
  fontFamily: 'Arial',
})

export const Marquee = () => {

}

export default Text
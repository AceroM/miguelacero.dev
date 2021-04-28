import tw from 'twin.macro'
import {styled} from '../../../stitches.config'

import Keyboards from './keyboards.mdx'
export { Keyboards }

const Paragraph = styled('p', {
  ...tw`m-0`,
})

const components = {
  p: Paragraph
}

export default components
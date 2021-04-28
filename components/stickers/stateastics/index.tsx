import tw from 'twin.macro'
import {styled} from '../../../stitches.config'

import Stateastics from './stateastics.mdx'
export { Stateastics }

const Paragraph = styled('p', {
  ...tw`m-0`,
})

const components = {
  p: Paragraph
}

export default components
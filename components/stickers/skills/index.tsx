import tw from 'twin.macro'
import {styled} from '../../../stitches.config'

import Skills from './skills.mdx'

export {Skills}

const Paragraph = styled('p', {
  ...tw`m-1`,
})

const components = {
  p: Paragraph
}

export default components
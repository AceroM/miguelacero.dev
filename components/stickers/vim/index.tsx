import tw from 'twin.macro'
import {styled} from '../../../stitches.config'

import Vim from './vim.mdx'

export {Vim}

const Paragraph = styled('p', {
  ...tw`m-1`,
})

const components = {
  p: Paragraph
}

export default components
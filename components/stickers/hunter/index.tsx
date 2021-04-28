import tw from 'twin.macro'
import {styled} from '../../../stitches.config'

import Hunter from './hunter.mdx'

export {Hunter}

const Paragraph = styled('p', {
  ...tw`m-1`,
})

const components = {
  p: Paragraph
}

export default components
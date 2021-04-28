import tw from 'twin.macro'
import {styled} from '../../../stitches.config'

import Miguel from './miguel.mdx'

export {Miguel}

const Paragraph = styled('p', {
  ...tw`mb-2`,
})

const Heading = styled('h1', {
  ...tw``,
})

const components = {
  h1: Heading,
  p: Paragraph,
}

export default components
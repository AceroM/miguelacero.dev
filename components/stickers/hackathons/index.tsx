import tw from 'twin.macro'
import {styled} from '../../../stitches.config'

import Hackathons from './hackathons.mdx'

export {Hackathons}

const Paragraph = styled('p', {
  ...tw`m-1`,
})

const components = {
  p: Paragraph
}

export default components
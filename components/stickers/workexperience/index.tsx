import tw from 'twin.macro'
import {styled} from '../../../stitches.config'

import WorkExperience from './workexperience.mdx'
export { WorkExperience }

const Paragraph = styled('p', {
  ...tw`m-0`,
})

const components = {
  p: Paragraph
}

export default components

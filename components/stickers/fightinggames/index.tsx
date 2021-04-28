import tw from 'twin.macro'
import {styled} from '../../../stitches.config'

import FightingGames from './fightinggames.mdx'

export {FightingGames}

const Paragraph = styled('p', {
  ...tw`p-1`,
})

const components = {
  p: Paragraph
}

export default components

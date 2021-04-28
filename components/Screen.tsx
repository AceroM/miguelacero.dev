import {MDXProvider} from '@mdx-js/react'
import Image from 'next/image'
import tw from 'twin.macro'
import {styled} from '../stitches.config'
import useStore from '../store'
import DraggableWindow from './DraggableWindow'
import FightingGameComponents, {FightingGames} from './stickers/fightinggames'
import HackathonsComponents, {Hackathons} from './stickers/hackathons'
import HunterComponents, {Hunter} from './stickers/hunter'
import KeyboardsComponents, {Keyboards} from './stickers/keyboards'
import MiguelComponents, {Miguel} from './stickers/miguel'
import SkillsComponents, {Skills} from './stickers/skills'
import VimComponents, {Vim} from './stickers/vim'
import WorkExperienceComponents, {WorkExperience} from './stickers/workexperience'

const Paragraph = styled('p', {
  ...tw`m-0`,
})

const defaultComponents = {
  // img: Image,
  p: Paragraph,
}

const options = {
  'stickers/miguel.png': {
    mdxComponents: MiguelComponents,
    component: <Miguel/>
  },
  'stickers/streetfighter.png': {
    mdxComponents: FightingGameComponents,
    component: <FightingGames/>
  },
  'stickers/vim.png': {
    mdxComponents: VimComponents,
    component: <Vim/>
  },
  'stickers/JS.png': {
    mdxComponents: SkillsComponents,
    component: <Skills/>
  },
  'stickers/mk.png': {
    mdxComponents: KeyboardsComponents,
    component: <Keyboards/>
  },
  'stickers/hunter.png': {
    mdxComponents: HunterComponents,
    component: <Hunter/>
  },
  'stickers/google.png': {
    mdxComponents: WorkExperienceComponents,
    component: <WorkExperience/>
  },
  'stickers/hackathons.png': {
    mdxComponents: HackathonsComponents,
    component: <Hackathons/>
  },
}

const Screen = ({sticker}) => {
  const {laptopOpen} = useStore(state => state)
  const {texture} = sticker
  let component, components
  if (options[texture].mdxComponents) {
    components = Object.assign(defaultComponents, options[texture].mdxComponents)
  }
  if (options[texture].component) {
    component = options[texture].component
  }
  return (
    <DraggableWindow
      laptopOpen={laptopOpen}
      sticker={sticker}
    >
      <MDXProvider components={components}>
        {component}
      </MDXProvider>
    </DraggableWindow>
  )
}

export default Screen
import useStore from '../store'
import DraggableWindow from './DraggableWindow'
import Hunter from './stickers/hunter.mdx'
import Vim from './stickers/vim.mdx'
import WorkExperience from './stickers/workexperience.mdx'
import FightingGames from './stickers/fightinggames.mdx'
import Skills from './stickers/skills.mdx'
import Keyboards from './stickers/keyboards.mdx'
import Hackathons from './stickers/hackathons.mdx'

const Screen = ({sticker}) => {
  const {laptopOpen} = useStore(state => state)
  let component
  switch (sticker.texture) {
    case 'stickers/vim.png':
      component = <Vim />
      break
    case 'stickers/JS.png':
      component = <Skills />
      break
    case 'stickers/mk.png':
      component = <Keyboards />
      break
    case 'stickers/hunter.png':
      component = <Hunter />
      break
    case 'stickers/google.png':
      component = <WorkExperience />
      break
    case 'stickers/hackathons.png':
      component = <Hackathons />
      break
    case 'stickers/streetfighter.png':
      component = <FightingGames />
      break
    default:
      component = <></>
  }
  // const isMobile = window.innerWidth < 1024

  return (
    <DraggableWindow
      laptopOpen={laptopOpen}
      sticker={sticker}
    >
      {component}
    </DraggableWindow>
  )
}

export default Screen
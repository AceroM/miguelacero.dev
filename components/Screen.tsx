import useStore from '../store'
import DraggableWindow from './DraggableWindow'
import Hunter from '../pages/stickers/hunter.mdx'
import Vim from '../pages/stickers/vim.mdx'
import WorkExperience from '../pages/stickers/workexperience.mdx'
import FightingGames from '../pages/stickers/fightinggames.mdx'
import Skills from '../pages/stickers/skills.mdx'
import Keyboards from '../pages/stickers/keyboards.mdx'
import Hackathons from '../pages/stickers/hackathons.mdx'

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
    case 'stickers/hacknyucat.png':
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
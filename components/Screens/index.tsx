import {a as three} from '@react-spring/three'
import {Html} from '@react-three/drei'
import {useLoader} from '@react-three/fiber'
import * as THREE from 'three'
import useStore from '../../store'
import Animoto from './animoto'
import Chase from './chase'
import Google from './google'
import HackNYU from './hacknyu'
import Hunter from './hunter'
import Keyboards from './keyboards'
import Skills from './skills'

const Index = () => {
  const {laptopOpen, selectedSticker} = useStore(state => state)
  let component
  switch (selectedSticker?.texture) {
    case 'stickers/hacknyucat.png':
      component = <HackNYU/>
      break
    case 'stickers/hunter.png':
      component = <Hunter/>
      break
    case 'stickers/mk.png':
      component = <Keyboards/>
      break
    case 'stickers/JS.png':
      component = <Skills/>
      break
    case 'stickers/google.png':
      component = <Google/>
      break
    case 'stickers/chase.png':
      component = <Chase/>
      break
    case 'stickers/animoto.png':
      component = <Animoto/>
      break
    default:
      component = <></>
  }
  const textureRaw = useLoader(THREE.TextureLoader, 'images/bigsur.png')
  const isMobile = window.innerWidth < 1024

  return (
    <three.group rotation-x={0} position={[0, 2.95, 0]}>
      {laptopOpen && (
        <Html position={[-3.9, 2.3, 0]}>
          {component}
        </Html>
      )}
      <three.mesh>
        <planeBufferGeometry args={[8.25, 5.17, 2]}/>
        <meshLambertMaterial map={textureRaw}/>
      </three.mesh>
    </three.group>
  )
}

export default Index
import {useSpring} from '@react-spring/core'
import {a as three} from '@react-spring/three'
import {a as web} from '@react-spring/web'
import {Environment} from '@react-three/drei'
import {Canvas} from '@react-three/fiber'
import {Suspense, useEffect} from 'react'
import {useHotkeys} from 'react-hotkeys-hook'
import tw from 'twin.macro'
import Laptop from '../components/3D/Laptop'
import Header from '../components/Header'
import {ThreeDLabel} from '../components/Text'
import {styled} from '../stitches.config'
import useStore from '../store'

const Model = ({open}) => {
  return (
    <>
      <three.pointLight
        position={[10, 10, 10]}
        intensity={1.5}
        color={open.to([0, 1], ['#f0f0f0', '#d25578'])}
      />
      <Suspense fallback={null}>
        <group position={[0, -1.2, 0]} rotation={[0, Math.PI, 0]}>
          <Laptop/>
        </group>
        <Environment preset="city"/>
      </Suspense>
    </>
  )
}

const Instructions = styled('div', {
  ...tw`absolute w-full h-full flex flex-col justify-center`,
  width: '19%',
})

const Home = () => {
  const {
    laptopOpen,
    closeLaptop,
    selectedSticker,
    addStickerToScreen,
    stickers,
    handleArrowKeyPress,
    setSticker
  } = useStore(state => state)
  const {open} = useSpring({open: Number(laptopOpen)})
  useHotkeys('up', () => handleArrowKeyPress('up'))
  useHotkeys('right', () => handleArrowKeyPress('right'))
  useHotkeys('down', () => handleArrowKeyPress('down'))
  useHotkeys('left', () => handleArrowKeyPress('left'))
  useHotkeys('enter', () => addStickerToScreen())
  useHotkeys('escape', () => closeLaptop())
  useEffect(() => {
    setSticker(stickers[0])
  }, [])

  return (
    <web.main style={{background: open.to([0, 1], ['#f0f0f0', selectedSticker?.bgColor || '#d25578'])}}>
      <ThreeDLabel>{selectedSticker?.name}</ThreeDLabel>
      <Header title="Home"/>
      <Instructions>
        <table style={{color: laptopOpen ? selectedSticker?.textColor : '#000'}}>
          <tr>
            <td>Command</td>
            <td>Shortcut Key</td>
          </tr>
          <tr>
            <td>Move Sticker Selection</td>
            <td>(← ↑ → ↓)</td>
          </tr>
          <tr>
            <td>Select Sticker</td>
            <td>enter</td>
          </tr>
          <tr>
            <td>Close Laptop</td>
            <td>esc</td>
          </tr>
        </table>
      </Instructions>
      <Canvas dpr={[1, 2]} camera={{position: [0, 0, 0], fov: 25}}>
        <Model open={open}/>
      </Canvas>
    </web.main>
  )
}
export default Home
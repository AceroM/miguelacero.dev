import {a as three} from '@react-spring/three'
import {Html} from '@react-three/drei'
import {useThree} from '@react-three/fiber'
import {useRef} from 'react'
import {useDrag} from 'react-use-gesture'
import tw, {theme} from 'twin.macro'
import {styled} from '../stitches.config'
import useStore from '../store'

const Container = styled('div', {
  ...tw`bg-white overflow-hidden rounded-md p-0 shadow-md`,
})

const TitleBar = styled('div', {
  ...tw`relative text-center rounded-t-md`,
  padding: '4px 65px 5px',
  boxShadow: 'inset 0 0 0 0 hsl(0deg 0% 100% / 60%), inset 0 0 0 0 rgb(0 0 0 / 20%)',
  backgroundImage: 'linear-gradient(180deg,#e7e6e7,#d1d0d1)',
})

const Controls = styled('div', {
  ...tw`flex absolute items-center`,
  top: 5, bottom: 5, left: 6,
})

const Button = styled('button', {
  ...tw`block h-2 w-2 mr-0.5 p-0 rounded-full cursor-pointer`,
  variants: {
    color: {
      red: {
        backgroundColor: '#ff5f58',
        borderColor: '#e1483f',
      },
      yellow: {
        backgroundColor: '#ffbe2f',
        borderColor: '#e0a028',
      },
      green: {
        backgroundColor: '#2ac940',
        borderColor: '#2bac2d',
      },
    }
  }
})

const Text = styled('div', {
  fontWeight: 400,
  letterSpacing: -0.3,
  color: String(theme`colors.macText`),
  fontSize: 9,
})

const Body = styled('div', {
  ...tw`h-full m-0 flex-1`,
})

const Center = styled('div', {
  ...tw`h-full p-2 flex flex-col items-center justify-center`,
})

const DraggableWindow = ({laptopOpen, children, sticker}) => {
  const {name, texture} = sticker
  if (!laptopOpen) return null

  const {getThemeFromSticker, removeStickerFromScreen, getWindowPos, setWindowPos} = useStore(state => state)
  const pos = getWindowPos(sticker)
  const meshRef = useRef(null)
  const windowRef = useRef(null)
  const s = useThree()
  let bounds = {
    top: -200,
    right: 275,
    bottom: 200,
    left: -275,
  }
  if (windowRef?.current?.clientWidth) {
    // const {clientWidth, clientHeight} = windowRef.current
    // console.log(`${name} clientWidth: `, clientWidth)
    // bounds.left = bounds.left + (clientWidth / 4)
    // console.log(`${name} bounds.left: `, bounds.left)
  }
  const bind = useDrag(({offset: [ox, oy], last, first}) => {
    const f = 0.009 // force
    meshRef.current.position.set(ox * f, -oy * f, 0.1)
    if (last) {
      setWindowPos(sticker, ox * f, -oy * f)
    }
  }, {
    bounds
  })
  const close = (e) => {
    e.stopPropagation()
    removeStickerFromScreen(sticker)
  }
  const maximize = (e) => {
    e.stopPropagation()
  }
  return (
    <three.mesh ref={meshRef} position={pos}>
      <Html ref={windowRef} distanceFactor={4.3} transform>
        <Container style={getThemeFromSticker(texture)}>
          <TitleBar {...bind()}>
            <Controls>
              <Button onClick={close} color="red"/>
              <Button color="yellow"/>
              <Button color="green"/>
            </Controls>
            <Text>
              {name}
            </Text>
          </TitleBar>
          <Body>
            <Center>
              {children}
            </Center>
          </Body>
        </Container>
      </Html>
    </three.mesh>
  )
}

const Screen = ({sticker}) => {
  const {laptopOpen} = useStore(state => state)
  let component
  // const isMobile = window.innerWidth < 1024

  return (
    <DraggableWindow
      laptopOpen={laptopOpen}
      sticker={sticker}
    >
      {sticker.component()}
    </DraggableWindow>
  )
}

export default Screen
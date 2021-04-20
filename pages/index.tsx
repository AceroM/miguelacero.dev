import {useSpring} from '@react-spring/core'
import {a as three} from '@react-spring/three'
import {a as web} from '@react-spring/web'
import {Environment} from '@react-three/drei'
import {Canvas, useThree} from '@react-three/fiber'
import {Suspense} from 'react'
import Laptop from '../components/3D/Laptop'
import Header from '../components/Header'
import useStore from '../store'

const Model = ({open}) => {
  // const {viewport} = useThree()
  // const isMobile = viewport.getCurrentViewport().width < 21

  return (
    <>
      <three.pointLight
        position={[10, 10, 10]}
        intensity={1.5}
        color={open.to([0, 1], ['#f0f0f0', '#d25578'])}
      />
      <Suspense fallback={null}>
        <group position={[0,-1,0]} rotation={[0, Math.PI, 0]}>
          <Laptop/>
        </group>
        <Environment preset="city"/>
      </Suspense>
    </>
  )
}

const Home = () => {
  const {laptopOpen, selectedSticker} = useStore(state => state)
  const {open} = useSpring({open: Number(laptopOpen)})

  return (
    <web.main style={{background: open.to([0, 1], ['#f0f0f0', selectedSticker?.bgColor || '#d25578'])}}>
      {/*<Intro/>*/}
      <Header title="Home"/>
      <Canvas dpr={[1, 2]} camera={{position: [0, 0, 0], fov: 25}}>
        <Model open={open}/>
      </Canvas>
    </web.main>
  )
}
export default Home
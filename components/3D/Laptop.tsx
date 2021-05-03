import {useSpring} from '@react-spring/core'
import {a as three} from '@react-spring/three'
import {Html, useGLTF} from '@react-three/drei'
import {useFrame, useLoader} from '@react-three/fiber'
import {useEffect, useRef, useState} from 'react'
import * as THREE from 'three'
import tw from 'twin.macro'
import {styled} from '../../stitches.config'
import useStore from '../../store'
import Screen from '../Screen'
import Sticker from './Sticker'

const vec = new THREE.Vector3()

const getLaptopPos = (cur: Number, t, status: boolean, type: string, value: string) => {
  // x: Math.cos(t / 2) / 12 + 0.25,gg
  const positions = {
    1: {
      rotation: {
        x: Math.cos(t / 2) / 12 + 0.25,
        y: 0,
        z: 0,
      },
      position: {
        x: 0,
        y: -1.7,
        z: 7,
      },
    },
    0: {
      rotation: {
        x: 0.9,
        y: 0.1,
        z: 0,
      },
      position: {
        x: -0.6,
        y: 5.0,
        z: 9,
      },
    }
  }

  return THREE.MathUtils.lerp(cur, positions[Number(status)][type][value], .1)
}

const BackButton = () => {
  const {laptopOpen, closeLaptop} = useStore(state => state)
  if (!laptopOpen) return null
  const close = e => {
    e.stopPropagation()
    closeLaptop()
  }
  const Container = styled('div', {
    ...tw`cursor-pointer bg-red-500 rounded-lg font-bold text-white text-center px-4 py-3`,
    ...tw`transition duration-300 ease-in-out hover:bg-red-600`,
    border: '5px solid black',
    width: 300
  })
  return (
    <mesh position={[-1.25,2.4,0]}>
      <Html>
        <Container onClick={close}>
          CLOSE LAPTOP
        </Container>
      </Html>
    </mesh>
  )
}

const Laptop = () => {
  const {nodes, materials} = useGLTF('/models/mac-draco.glb')
  const {laptopOpen, stickers, openStickers, closeLaptop} = useStore(state => state)
  const {open} = useSpring({open: Number(laptopOpen)})
  const [hovered, setHovered] = useState(false)
  const hinge = open.to([0, 1], [1.575, -0.425])
  const group = useRef<THREE.group>(null)

  // Only show the cursor throughout the laptop if opened.
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    state.camera.position.lerp(vec.set(0, 0, laptopOpen ? -24 : -32), 0.1)
    state.camera.lookAt(0, 0, 0)
    group.current.rotation.x = getLaptopPos(group.current.rotation.x, t, laptopOpen, 'rotation', 'x')
    group.current.rotation.y = getLaptopPos(group.current.rotation.y, t, laptopOpen, 'rotation', 'y')
    group.current.rotation.z = getLaptopPos(group.current.rotation.z, t, laptopOpen, 'rotation', 'z')
    group.current.position.x = getLaptopPos(group.current.position.x, t, laptopOpen, 'position', 'x')
    group.current.position.y = getLaptopPos(group.current.position.y, t, laptopOpen, 'position', 'y')
    group.current.position.z = getLaptopPos(group.current.position.z, t, laptopOpen, 'position', 'z')
  })

  const stickerList = stickers.map(s => (
    <Sticker key={s.texture} sticker={s}/>
  ))
  const screenList = openStickers.map(s => (
    <Screen key={s.texture} sticker={s}/>
  ))
  const textureRaw = useLoader(THREE.TextureLoader, 'images/bigsur.png')

  return (
    <group
      ref={group}
      onPointerOver={e => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={e => {
        e.stopPropagation()
        setHovered(false)
      }}
      dispose={null}
    >
      <ambientLight intensity={0.3}/>
      <three.group rotation-x={hinge} position={[0, -0.04, 0.41]}>
        <ambientLight/>
        <group>
          {stickerList}
        </group>
        <group position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh material={materials.aluminium} geometry={nodes['Cube008'].geometry}/>
          <mesh material={materials['matte.001']} geometry={nodes['Cube008_1'].geometry}/>
          <mesh material={materials['screen.001']} geometry={nodes['Cube008_2'].geometry}/>
        </group>
        <three.group rotation-x={0} position={[0, 2.95, 0]}>
          <three.mesh>
            <planeBufferGeometry args={[8.25, 5.17, 2]}/>
            <meshLambertMaterial map={textureRaw}/>
            {/*<BackButton/>*/}
            {screenList}
          </three.mesh>
        </three.group>
      </three.group>
      <mesh material={materials.keys} geometry={nodes.keyboard.geometry} position={[1.79, 0, 3.45]}/>
      <group position={[0, -0.1, 3.39]}>
        <mesh material={materials.aluminium} geometry={nodes['Cube002'].geometry}/>
        <mesh material={materials.trackpad} geometry={nodes['Cube002_1'].geometry}/>
      </group>
      <mesh material={materials.touchbar} geometry={nodes.touchbar.geometry} position={[0, -0.03, 1.2]}/>
    </group>
  )
}

export default Laptop

import {useSpring} from '@react-spring/core'
import {a as three} from '@react-spring/three'
import {useGLTF} from '@react-three/drei'
import {useFrame, useThree} from '@react-three/fiber'
import {useEffect, useRef, useState} from 'react'
import * as THREE from 'three'
import useStore from '../../store'
import Screens from '../Screens'
import Sticker from './Sticker'

const vec = new THREE.Vector3()

function Laptop() {
  const {nodes, materials} = useGLTF('/models/mac-draco.glb')
  const {laptopOpen, closeLaptop, stickers} = useStore(state => state)
  const {open} = useSpring({open: Number(laptopOpen)})
  const [hovered, setHovered] = useState(false)
  const hinge = open.to([0, 1], [1.575, -0.425])
  const group = useRef<THREE.group>(null)

  // Only show the cursor throughout the laptop if opened.
  useEffect(() => {
    if (laptopOpen) {
      document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }
  }, [hovered, laptopOpen])
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
      onClick={e => {
        e.stopPropagation()
        if (laptopOpen) {
          closeLaptop()
        }
      }}
      dispose={null}>
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
        <Screens/>
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
        y: 4,
        z: 9,
      },
    }
  }

  return THREE.MathUtils.lerp(cur, positions[Number(status)][type][value], .1)
}
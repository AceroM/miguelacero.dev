import {a as three} from '@react-spring/three'
import {useLoader} from '@react-three/fiber'
import {Bloom, EffectComposer} from '@react-three/postprocessing'
import {Suspense, useEffect, useState} from 'react'
import * as THREE from 'three'
import tw from 'twin.macro'
import {styled} from '../../stitches.config'
import useStore from '../../store'

export type WindowInfo = {
  // position on screen
  x: number;
  y: number;
  // boundaries
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type ArrowKeys = {
  up?: string;
  right?: string;
  down?: string;
  left?: string;
}

export type StickerType = {
  name: string;
  type: StickerOpen;
  href?: string;
  bgColor?: string;
  textColor?: string;
  texture: string;
  size: [number, number];
  rotation: number;
  x: number;
  y: number;
  arrowKeys: ArrowKeys;
  window: WindowInfo;
}

// Describes what happens when you open a sticker
export enum StickerOpen {
  LaptopOpen,
  OpenLink,
}

const StickerTitle = styled('h2', {
  ...tw`font-black text-white border-8 border-black`,
  '-webkit-text-fill-color': 'white',
  '-webkit-text-stroke-width': '0.7px',
  '-webkit-text-stroke-color': 'black'
})

interface ReticleProps {
  size: [number, number];
}

const Reticle = ({size}: ReticleProps) => {
  const [width, height] = size
  const rt = 0.046 // reticle thickness
  const rl = 1.2 // reticle length
  const rd = 0.6 // reticle distance from center
  const targetMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('red')})

  return (
    <group name="target">
      <mesh position={[0, height * rd, 0]} material={targetMaterial}>
        <boxGeometry args={[width * rl, rt, rt]}/>
      </mesh>
      <mesh position={[width * rd, 0, 0]} material={targetMaterial}>
        <boxGeometry args={[rt, height * rl, rt]}/>
      </mesh>
      <mesh position={[0, height * -rd, 0]} material={targetMaterial}>
        <boxGeometry args={[width * rl, rt, rt]}/>
      </mesh>
      <mesh position={[width * -rd, 0, 0]} material={targetMaterial}>
        <boxGeometry args={[rt, height * rl, rt]}/>
      </mesh>
    </group>
  )
}

interface StickerProps {
  sticker?: StickerType
}

const Sticker = ({sticker}: StickerProps) => {
  const {name, type, href, texture, size, x, y, rotation} = sticker
  const textureRaw = useLoader(THREE.TextureLoader, texture)
  const textureSelectedRaw = useLoader(THREE.TextureLoader, `${texture.slice(0, -4)}_selected.png`)
  const {laptopOpen, openLaptop, setSticker, selectedSticker, addStickerToScreen} = useStore(state => state)
  const [hovered, setHovered] = useState(false)
  const selected = selectedSticker?.texture === sticker.texture

  useEffect(() => void (document.body.style.cursor = hovered ? 'pointer' : 'auto'), [hovered])
  return (
    <>
      <three.mesh
        position={[x, y, -0.21]}
        rotation-x={-3.14}
        rotation-z={rotation}
        onPointerOver={e => {
          e.stopPropagation()
          setSticker(sticker)
          setHovered(true)
        }}
        onPointerOut={e => {
          e.stopPropagation()
          setHovered(false)
        }}
        onClick={e => {
          e.stopPropagation()
          addStickerToScreen(sticker)
        }}
      >
        <planeBufferGeometry args={size}/>
        <meshLambertMaterial transparent={true} map={selected ? textureSelectedRaw : textureRaw}/>
      </three.mesh>
    </>
  )
}

export default Sticker
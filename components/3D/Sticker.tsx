import {a as three} from "@react-spring/three"
import {Html} from "@react-three/drei"
import {useLoader} from "@react-three/fiber"
import {useEffect, useState} from "react"
import * as THREE from 'three'
import tw from "twin.macro"
import {styled} from "../../stitches.config"
import useStore from "../../store"

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
}

// Describes what happens when you open a sticker
export enum StickerOpen {
  LaptopOpen,
  OpenLink,
  Nothing,
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
  const {laptopOpen, openLaptop, setSticker, selectedSticker} = useStore(state => state)
  const [hovered, setHovered] = useState(false)

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
          switch (type) {
            case StickerOpen.LaptopOpen:
              openLaptop()
              break
            case StickerOpen.OpenLink:
              window.open(href)
              break
          }
        }}
      >
        {!laptopOpen && selectedSticker?.texture === sticker.texture && (
          <>
            {size && (
              <Reticle size={size}/>
            )}
            <Html>
              <StickerTitle>{name}</StickerTitle>
            </Html>
          </>
        )}
        <planeBufferGeometry args={size}/>
        <meshLambertMaterial transparent={true} map={textureRaw}/>
      </three.mesh>
    </>
  )
}

export default Sticker
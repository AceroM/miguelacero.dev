import create, {GetState, SetState} from 'zustand'
import {StickerOpen, StickerType} from '../components/3D/Sticker'

type themeStyleType = {
  color: string;
  backgroundColor: string;
}

type Store = {
  laptopOpen: boolean;
  openLaptop: () => void;
  closeLaptop: () => void;
  getThemeFromSticker: () => themeStyleType;
  selectedSticker: StickerType | null;
  setSticker: (sticker: StickerType) => void;
  stickers: StickerType[];
}

const useStore = create<Store>((set: SetState<Store>, get: GetState<Store>) => {
  return {
    laptopOpen: false,
    openLaptop: () => set(state => ({laptopOpen: true})),
    closeLaptop: () => set(state => ({laptopOpen: false})),
    selectedSticker: null,
    getThemeFromSticker: () =>{
      const { textColor, bgColor } = get().selectedSticker
      const theme = {
        color: '#423f42',
        backgroundColor: '#f0f0f0',
      }
      if (textColor && bgColor) {
        theme.color = textColor
        theme.backgroundColor = bgColor
      }
      return theme
    },
    setSticker: (sticker) => set({selectedSticker: sticker}),
    stickers: [
      {
        name: 'Vim',
        type: StickerOpen.OpenLink,
        href: 'https://gist.github.com/AceroM/64dd2e89c3f5d834f6ee74c66551bace',
        texture: 'stickers/vim.png',
        size: [1, 1],
        rotation: -.25,
        x: 3.7,
        y: .9,
      },
      {
        name: 'Skills',
        type: StickerOpen.LaptopOpen,
        bgColor: '#f9e034',
        textColor: '#000',
        texture: 'stickers/JS.png',
        size: [0.9, 0.9],
        rotation: 0,
        x: 3.4,
        y: 2.3,
      },
      {
        name: 'College',
        type: StickerOpen.LaptopOpen,
        href: '',
        bgColor: '#5f259f',
        textColor: '#fff',
        texture: 'stickers/hunter.png',
        size: [3, 1],
        rotation: 0,
        x: -2.7,
        y: 5.3
      },
      {
        name: 'Google',
        type: StickerOpen.LaptopOpen,
        bgColor: '#4285F4',
        textColor: '#fff',
        texture: 'stickers/google.png',
        size: [1.6, 1.6],
        rotation: -0.1,
        x: -0.3,
        y: 1
      },
      {
        name: 'Mechanical Keyboards',
        type: StickerOpen.LaptopOpen,
        bgColor: '#fec8cd',
        textColor: '#a30000',
        texture: 'stickers/mk.png',
        size: [2.36, 1.49],
        rotation: .4,
        x: 3,
        y: 5
      },
      {
        name: 'Chase',
        type: StickerOpen.LaptopOpen,
        bgColor: '#0e68ac',
        textColor: '#ffffff',
        texture: 'stickers/chase.png',
        size: [1.6, 1.6],
        rotation: 0.15,
        x: -1.9,
        y: 1.13,
      },
      {
        name: 'Animoto',
        type: StickerOpen.LaptopOpen,
        bgColor: '#e3edb1',
        textColor: '#ffffff',
        texture: 'stickers/animoto.png',
        size: [1.5, 1.5],
        rotation: -0.14,
        x: -3.3,
        y: 1,
      },
      {
        name: 'Hack Cooper',
        type: StickerOpen.LaptopOpen,
        bgColor: '#ffc600',
        textColor: '#ffffff',
        texture: 'stickers/hackcooper.png',
        size: [3.6 * .4, 1.73 * .4],
        rotation: -0,
        x: -3.4,
        y: 4,
      },
      {
        name: 'HackNYU',
        type: StickerOpen.LaptopOpen,
        bgColor: '#fae2a5',
        textColor: '#000',
        texture: 'stickers/hacknyucat.png',
        size: [7.04 * 0.24, 4.59 * 0.24],
        rotation: -0.12,
        x: -3,
        y: 3.03,
      },
      {
        name: 'Github',
        type: StickerOpen.OpenLink,
        href: 'https://github.com/AceroM',
        texture: 'stickers/github.png',
        size: [1.3,1.3],
        rotation: 0.12,
        x: 2.4,
        y: 1,
      },
    ]
  }
})

export default useStore
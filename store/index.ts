import create, {GetState, SetState} from 'zustand'
import {StickerOpen, StickerType} from '../components/3D/Sticker'
import Hunter from '../pages/stickers/hunter.mdx'
import Vim from '../pages/stickers/vim.mdx'
import WorkExperience from '../pages/stickers/workexperience.mdx'
import FightingGames from '../pages/stickers/fightinggames.mdx'
import Skills from '../pages/stickers/skills.mdx'
import Keyboards from '../pages/stickers/keyboards.mdx'
import Hackathons from '../pages/stickers/hackathons.mdx'

type themeStyleType = {
  color: string;
  backgroundColor: string;
}

type Store = {
  laptopOpen: boolean;
  openLaptop: () => void;
  closeLaptop: () => void;
  openStickers: StickerType[] | null;
  addStickerToScreen: (sticker: StickerType) => void;
  removeStickerFromScreen: (sticker: StickerType) => void;
  getWindowPos: (sticker: StickerType) => [number, number, number];
  setWindowPos: (sticker: StickerType, x: number, y: number) => void;
  selectedSticker: StickerType | null; // Used to change the background color
  getThemeFromSticker: (texture?: string) => themeStyleType;
  setSticker: (sticker: StickerType) => void;
  stickers: StickerType[];
}

const useStore = create<Store>((set: SetState<Store>, get: GetState<Store>) => {
  return {
    laptopOpen: false,
    openLaptop: () => set(state => ({laptopOpen: true})),
    closeLaptop: () => set(state => ({laptopOpen: false})),
    openStickers: [],
    addStickerToScreen: (sticker) => {
      if (sticker.type === StickerOpen.LaptopOpen) {
        let newStickers = get().openStickers
        const foundIdx = newStickers.findIndex(s => s.texture === sticker.texture)
        if (foundIdx === -1) {
          set({openStickers: [...get().openStickers, sticker]})
        }
      }
    },
    removeStickerFromScreen: (sticker) => {
      let newStickers = get().openStickers
      const foundIdx = newStickers.findIndex(s => s.texture === sticker.texture)
      if (foundIdx > -1) {
        newStickers.splice(foundIdx, 1)
        set({openStickers: newStickers})
      }
    },
    getWindowPos: (sticker) => {
      let temp = get().openStickers
      const foundIdx = temp.findIndex(s => s.texture === sticker.texture)
      if (foundIdx > -1) {
        const {x, y} = temp[foundIdx].window
        return [x, y, 0]
      }
    },
    setWindowPos: (sticker, x, y) => {
      let temp = get().openStickers
      const foundIdx = temp.findIndex(s => s.texture === sticker.texture)
      if (foundIdx > -1) {
        temp[foundIdx].window.x = x
        temp[foundIdx].window.y = y
        set({openStickers: temp})
      }
    },
    selectedSticker: null,
    getThemeFromSticker: (texture?: string) => {
      const theme = {
        color: '#423f42',
        backgroundColor: '#f0f0f0',
      }
      let temp = get().openStickers
      if (!texture) {
        theme.color = get().selectedSticker.textColor
        theme.backgroundColor = get().selectedSticker.bgColor
      } else {
        const foundIdx = temp.findIndex(s => s.texture === texture)
        if (foundIdx > -1) {
          const {textColor, bgColor} = temp[foundIdx]
          if (textColor && bgColor) {
            theme.color = textColor
            theme.backgroundColor = bgColor
          }
        }
      }
      return theme
    },
    setSticker: (sticker) => set({selectedSticker: sticker}),
    stickers: [
      {
        name: 'Vim',
        component: Vim,
        type: StickerOpen.OpenLink,
        href: 'https://gist.github.com/AceroM/64dd2e89c3f5d834f6ee74c66551bace',
        texture: 'stickers/vim.png',
        size: [1, 1],
        rotation: -.25,
        x: 3.7,
        y: .9,
        window: {
          x: 0,
          y: 0,
          top: -100,
          right: 100,
          bottom: 100,
          left: -100,
        },
      },
      {
        name: 'Skills',
        component: Skills,
        type: StickerOpen.LaptopOpen,
        bgColor: '#f9e034',
        textColor: '#000',
        texture: 'stickers/JS.png',
        size: [0.9, 0.9],
        rotation: 0,
        x: 3.4,
        y: 2.3,
        window: {
          x: 0,
          y: 0,
          top: -100,
          right: 100,
          bottom: 100,
          left: -100,
        },
      },
      {
        name: 'Hunter College',
        component: Hunter,
        type: StickerOpen.LaptopOpen,
        bgColor: '#5f259f',
        textColor: '#fff',
        texture: 'stickers/hunter.png',
        size: [3, 1],
        rotation: 0,
        x: -2.7,
        y: 5.3,
        window: {
          x: 0,
          y: 0,
          top: -100,
          right: 100,
          bottom: 100,
          left: -100,
        },
      },
      {
        name: 'Work Experience',
        component: WorkExperience,
        type: StickerOpen.LaptopOpen,
        bgColor: '#4285F4',
        textColor: '#fff',
        texture: 'stickers/google.png',
        size: [1.6, 1.6],
        rotation: -0.1,
        x: -0.3,
        y: 1,
        window: {
          x: 0,
          y: 0,
          top: -100,
          right: 100,
          bottom: 100,
          left: -100,
        },
      },
      {
        name: 'Mechanical Keyboards',
        component: Keyboards,
        type: StickerOpen.LaptopOpen,
        bgColor: '#fec8cd',
        textColor: '#a30000',
        texture: 'stickers/mk.png',
        size: [2.36, 1.49],
        rotation: .4,
        x: 3,
        y: 5,
        window: {
          x: 0,
          y: 0,
          top: -100,
          right: 100,
          bottom: 100,
          left: -100,
        },
      },
      {
        name: 'HackNYU',
        component: Hackathons,
        type: StickerOpen.LaptopOpen,
        bgColor: '#fae2a5',
        textColor: '#000',
        texture: 'stickers/hacknyucat.png',
        size: [7.04 * 0.24, 4.59 * 0.24],
        rotation: -0.12,
        x: -3,
        y: 3.03,
        window: {
          x: 0,
          y: 0,
          top: -100,
          right: 100,
          bottom: 100,
          left: -100,
        },
      },
      {
        name: 'Github',
        type: StickerOpen.OpenLink,
        href: 'https://github.com/AceroM',
        texture: 'stickers/github.png',
        size: [1.3, 1.3],
        rotation: 0.12,
        x: 2.4,
        y: 1,
        window: {
          x: 0,
          y: 0,
          top: -100,
          right: 100,
          bottom: 100,
          left: -100,
        },
      },
      {
        name: 'Fighting Games',
        component: FightingGames,
        type: StickerOpen.LaptopOpen,
        texture: 'stickers/streetfighter.png',
        bgColor: '#ff8200',
        textColor: '#000',
        size: [633*0.005,236*0.005],
        rotation: 0.2,
        x: 0.35,
        y: 5,
        window: {
          x: 0,
          y: 0,
          top: -100,
          right: 100,
          bottom: 100,
          left: -100,
        },
      },
    ]
  }
})

export default useStore
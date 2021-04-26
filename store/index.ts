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
  openStickers: StickerType[] | null;
  addStickerToScreen: (sticker?: StickerType) => void;
  removeStickerFromScreen: (sticker: StickerType) => void;
  getWindowPos: (sticker: StickerType) => [number, number, number];
  setWindowPos: (sticker: StickerType, x: number, y: number) => void;
  selectedSticker: StickerType | null; // Used to change the background color
  getThemeFromSticker: (texture?: string) => themeStyleType;
  setSticker: (sticker: StickerType) => void;
  handleArrowKeyPress: (direction: string) => void;
  stickers: StickerType[];
}

function scaleImg(x: number, y: number, s: number): [number, number] {
  return [x * s, y * s]
}

const useStore = create<Store>((set: SetState<Store>, get: GetState<Store>) => {
  return {
    laptopOpen: false,
    openLaptop: () => set(state => ({laptopOpen: true})),
    closeLaptop: () => set(state => ({laptopOpen: false})),
    openStickers: [],
    addStickerToScreen: (s) => {
      let sticker
      if (!s) {
        sticker = get().selectedSticker
      } else {
        sticker = s
      }
      if (sticker.type === StickerOpen.LaptopOpen) {
        let newStickers = get().openStickers
        const foundIdx = newStickers.findIndex(s => s.texture === sticker.texture)
        if (foundIdx === -1) {
          set({openStickers: [...get().openStickers, sticker]})
        }
        get().openLaptop()
      } else if (sticker.type === StickerOpen.OpenLink) {
        window.open(sticker.href)
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
    handleArrowKeyPress: (direction: string) => {
      const {arrowKeys} = get().selectedSticker
      if (arrowKeys[direction]) {
        const foundSticker = get().stickers.find(s => s.texture === arrowKeys[direction])
        if (foundSticker) {
          set({selectedSticker: foundSticker})
        }
      }
    },
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
        arrowKeys: {
          down: 'stickers/JS.png',
          left: 'stickers/github.png',
        },
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
        type: StickerOpen.LaptopOpen,
        bgColor: '#f9e034',
        textColor: '#000',
        texture: 'stickers/JS.png',
        size: [0.9, 0.9],
        rotation: 0,
        x: 3.4,
        y: 1.9,
        arrowKeys: {
          up: 'stickers/vim.png',
          down: 'stickers/streetfighter.png',
          left: 'stickers/github.png',
        },
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
        type: StickerOpen.LaptopOpen,
        bgColor: '#5f259f',
        textColor: '#fff',
        texture: 'stickers/hunter.png',
        size: scaleImg(2088, 762, 0.0015),
        rotation: 0,
        x: -2.7,
        y: 5.3,
        arrowKeys: {
          up: 'stickers/hackathons.png',
          right: 'stickers/mk.png',
        },
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
        type: StickerOpen.LaptopOpen,
        bgColor: '#4285F4',
        textColor: '#fff',
        texture: 'stickers/google.png',
        size: [1.6, 1.6],
        rotation: -0.1,
        x: -1.3,
        y: 1,
        arrowKeys: {
          left: 'stickers/hackathons.png',
          right: 'stickers/github.png',
        },
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
        type: StickerOpen.LaptopOpen,
        bgColor: '#fec8cd',
        textColor: '#a30000',
        texture: 'stickers/mk.png',
        size: scaleImg(532, 352, 0.005),
        rotation: .4,
        x: 2.8,
        y: 5,
        arrowKeys: {
          up: 'stickers/streetfighter.png',
          left: 'stickers/hunter.png',
        },
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
        name: 'Hackathons',
        type: StickerOpen.LaptopOpen,
        bgColor: '#fed330',
        textColor: '#000',
        texture: 'stickers/hackathons.png',
        size: [2, 2],
        rotation: -0.12,
        x: -3.2,
        y: 1.23,
        arrowKeys: {
          right: 'stickers/google.png',
          down: 'stickers/hunter.png',
        },
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
        arrowKeys: {
          right: 'stickers/vim.png',
          down: 'stickers/JS.png',
          left: 'stickers/google.png',
        },
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
        type: StickerOpen.LaptopOpen,
        texture: 'stickers/streetfighter.png',
        bgColor: '#ff8200',
        textColor: '#000',
        size: scaleImg(673, 319, 0.003),
        rotation: 0.2,
        x: 3.35,
        y: 3.5,
        arrowKeys: {
          up: 'stickers/JS.png',
          down: 'stickers/mk.png',
        },
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
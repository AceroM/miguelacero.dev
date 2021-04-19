import {useSpring} from '@react-spring/core'
import {a as web} from '@react-spring/web'
import {Head} from 'next/document'
import {useRouter} from 'next/router'
import {useState} from 'react'
import tw from 'twin.macro'
import {styled} from '../stitches.config'
import useStore from '../store'

const navItems = [
  {
    name: 'Blog',
    href: '/blog',
  },
  {
    name: 'About',
    href: '/about',
  },
]

const Container = styled(web.div, {
  ...tw`relative container mx-auto px-4 z-50`,
  variants: {
    isHome: {
      true: {
        marginBottom: '-68px',
      }
    }
  }
})
const HeaderContainer = styled(web.header, {
  ...tw`flex flex-col sm:flex-row items-center justify-between`,
})
const Title = styled(web.h3, {
  ...tw`text-xl font-bold hover:cursor-pointer`,
})
const Navbar = styled(web.nav, {
  ...tw`hidden md:flex`,
})
const Link = styled(web.a, {
  ...tw`font-medium text-base hover:text-black py-3 px-6`,
})

const NavLink = ({ href, name }) => {
  const [hovered, setHovered] = useState(false)
  const isHome = useRouter().pathname === '/'

  const style = useSpring({
    config: {
      tension: 300,
      friction: 10,
    },
    opacity: 1,
    from: {
      opacity: 0,
    }
  })

  return (
    <Link onMouseEnter={() => setHovered(true)} style={style} href={href}>{name}</Link>
  )
}

const Header = ({ title }) => {
  const isHome = useRouter().pathname === '/'
  const {laptopOpen, selectedSticker} = useStore(state => state)
  const {open} = useSpring({open: Number(laptopOpen)})
  const navList = navItems.map(n => (
    <NavLink href={n.href} name={n.name} key={n.name} />
  ))
  const colorChange = {color: open.to([0, 1], ['#1f2937', selectedSticker?.textColor || '#1f2937'])}

  return (
    <Container isHome={isHome}>
      {/*<Head>*/}
      {/*  <title>miguelacero.dev | {title}</title>*/}
      {/*</Head>*/}
      <HeaderContainer style={colorChange}>
        <Title onClick={() => location.href = '/'}>
          miguelacero.dev
        </Title>
        {/* TODO: add fade in animations here */}
        <Navbar style={colorChange}>
          {navList}
        </Navbar>
      </HeaderContainer>
    </Container>
  )
}

export default Header
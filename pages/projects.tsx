import {Box, Flex, Image, Badge, Text, Button, Heading, Link} from '@chakra-ui/react'
import Header from '../components/Header'
import data from '../projects.json'

const Project = ({name, description, category, technologies, srcHref, viewHref, imgHref}) => {
  return (
    <Box borderRadius="xl" bgColor="white" p="5" my={2} mr={4} maxW="320px" borderWidth="1px">
      <Image objectFit="cover" w={278} h={175} borderRadius="md" src={imgHref || "https://lab.csschopper.com/placeholder/images/placeholder_image_logo.png"}/>
      <Flex align="baseline" mt={2}>
        <Text
          ml={2}
          textTransform="uppercase"
          fontSize="sm"
          fontWeight="bold"
          color="pink.800"
        >
          {category}
        </Text>
      </Flex>
      <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
        {name}
      </Text>
      <Flex
        flexFlow="row wrap"
        my={1}
      >
        {technologies.map(t => (
          <Badge mr={2} key={t.name} colorScheme={t.color}>{t.name}</Badge>
        ))}
      </Flex>
      <Text mb={3} fontSize="md">{description}</Text>
      <Flex justifyContent="flex-end">
        {viewHref && (
          <Link isExternal href={viewHref}>
            <Button mr={3}>View</Button>
          </Link>
        )}
        {srcHref && (
          <Link isExternal href={srcHref}>
            <Button>Source Code</Button>
          </Link>
        )}
      </Flex>
    </Box>
  )
}

const Projects = () => {
  return (
    <>
      <Header title="projects"/>
      <Box mx="auto" maxW="85%">
        <Heading mb={19}>Projects</Heading>
        <Flex
          justifyContent="center"
          alignItems="center"
          flexFlow="row wrap"
        >
          {data.map(p => (
            <Project
              key={p.id}
              name={p.name}
              description={p.description}
              category={p.category}
              technologies={p.technologies}
              viewHref={p.viewHref}
              srcHref={p.srcHref}
              imgHref={p.imgHref}
            />
          ))}
        </Flex>
        <Text mt={3} size="lg">More coming soon...</Text>
      </Box>
    </>
  )
}

export default Projects
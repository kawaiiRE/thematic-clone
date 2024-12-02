import React, { useState } from 'react'
import {
  Box,
  useBreakpointValue,
  Button,
  Text,
  Input,
  IconButton,
  VStack,
  Heading
} from '@chakra-ui/react'
import Navbar from './Navbar'
import { useColorMode } from '../ui/color-mode'
import { FaChevronRight } from 'react-icons/fa'
import { IoChatbubbleSharp } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'

const navBarHeight = '65px'

function Layout ({ children }) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleMenu = () => setIsChatOpen(!isChatOpen)

  const { colors, fonts } = useColorMode()

  const isMobile = { base: true, md: false }
  // console.log({ isMobile })
  return (
    <>
      <Box bg={colors.background}>
        <Box
          ml={{ base: 0, md: '0' }}
          paddingTop={navBarHeight}
          pt={{ base: '60px', md: navBarHeight }}
          zIndex={0}
        >
          <Navbar
            isMobile={isMobile}
            colors={colors}
            navBarHeight={navBarHeight}
            fonts={fonts}
          />
          <Box padding='30px 0 30px 0'>{children}</Box>
        </Box>
      </Box>

      <Box position='fixed' bottom='20px' left='20px' zIndex='1000'>
        <IconButton
          colorScheme='teal'
          borderRadius='full'
          bg='#f21b91'
          size='lg'
          onClick={toggleMenu}
        >
          {isChatOpen ? <IoMdClose /> : <IoChatbubbleSharp />}
        </IconButton>

        {isChatOpen && (
          <Box
            position='absolute'
            bottom='70px'
            left='0'
            bg='#fafafa'
            boxShadow='md'
            borderRadius='8px'
            width='350px'
            padding='10px'
            zIndex='100'
            height='500px'
            overflowY='auto'
          >
            <VStack align='start' spacing='4'>
              <Box width='100%' textAlign='center'>
                <img
                  src='https://via.placeholder.com/50'
                  alt='Thematic Logo'
                  style={{ borderRadius: '50%' }}
                />
              </Box>
              <Text fontWeight='bold'>Hello ✋</Text>
              <Text fontSize='sm'>
                Got a question? We would love to help you!
              </Text>
              <Box bg='white' width='100%' p={5}>
                <Heading as='h2' size='2xl'>
                  Start a conversation
                </Heading>
                <Text fontSize='sm' color='gray.500'>
                  Thematic Team
                  <br />
                  We'll be back: 20:00
                </Text>
                <Button
                  colorScheme='teal'
                  width='100%'
                  bg='#f21b91'
                  onClick={toggleMenu}
                >
                  Start a conversation
                </Button>
              </Box>
            </VStack>

            <VStack align='start' spacing='4' marginTop='6'>
              <Text fontWeight='bold'>Find an answer</Text>
              <Input
                placeholder='Search for articles'
                _placeholder={{ color: 'gray.500' }}
                isReadOnly
              />
            </VStack>

            <VStack align='start' spacing='4' marginTop='6'>
              <Button variant='link'>
                Creator Help Center <FaChevronRight />
              </Button>
              <Button variant='link'>
                Artist Help Center <FaChevronRight />
              </Button>
              <Button variant='link'>
                FAQ's <FaChevronRight />
              </Button>
              <Button variant='link' color='#f21b91'>
                Explore our knowledge base
              </Button>
            </VStack>
          </Box>
        )}
      </Box>
    </>
  )
}

export default Layout

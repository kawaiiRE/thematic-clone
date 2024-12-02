import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Collapsible,
  VStack,
  HStack,
  IconButton,
  Table,
  Flex
} from '@chakra-ui/react'
import { FaDownload, FaShareAlt, FaPlusCircle } from 'react-icons/fa'
import { Tag } from '../components/ui/tag'
import { useLocation } from 'react-router-dom'
import baseAxios from '../utils/axios'

const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
  navigator.userAgent
)

const PlaylistPreview = () => {
  const [expandedRow, setExpandedRow] = useState(1)
  const [songs, setSongs] = useState([])

  const location = useLocation()
  const { playlist } = location.state || {}
  //   console.log({ playlist })

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await baseAxios.get(
          `projects/${playlist.id}/songs?offset=0&limit=15`
        )
        // console.log({ response })
        setSongs(response.items)
      } catch (err) {
        console.error(err)
      }
    }

    if (playlist) {
      fetchSongs()
    }
  }, [playlist])

  return (
    <Box p={5} display='flex' flexDirection='column' alignItems='center'>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justifyContent='space-between'
        width='75%'
        p={5}
        alignItems='center'
        boxShadow='0 4px 6px rgba(0, 0, 0, 0.2)'
      >
        <Image
          src={playlist.art_file_url ?? 'https://via.placeholder.com/500'}
          boxSize='250px'
          objectFit='cover'
          borderRadius='8px'
          mr={5}
        />

        <VStack spacing={3} width='70%' align={{ base: 'center', md: 'start' }}>
          <Text fontSize='md' color='gray.400'>
            Playlist
          </Text>
          <Heading as='h2' size='2xl'>
            {playlist.name}
          </Heading>
          <HStack align='center' spacing={3} width='70%'>
            <Text fontSize='sm' color='gray.400'>
              by
            </Text>

            <Image
              src={
                playlist.user.profile_image_url ??
                'https://via.placeholder.com/500'
              }
              boxSize='30px'
              objectFit='cover'
              borderRadius='8px'
            />
            <Text fontSize='sm' color='gray.400'>
              {playlist.user.profile_name} ● {songs.length} songs
            </Text>
          </HStack>

          <Text fontSize='sm' color='gray.400'>
            This {playlist.name}
            playlist from {playlist.user.profile_name} features the best
            copyright-free songs for
            {playlist.themes
              .map((theme, index) => theme.name)
              .join(', ')
              .replace(
                /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                ''
              )
              .trim()}
            , YouTube videos, social media, and podcasts
          </Text>

          <Text fontSize='md' color='gray.400'>
            {playlist.description}
          </Text>
          <Heading fontSize='lg' color='gray.400'>
            Trending in
          </Heading>
          <Flex direction='row'>
            {playlist.themes.map((theme, index) => (
              <Tag
                key={index}
                colorScheme='teal'
                borderRadius='full'
                padding='5px'
              >
                {theme.name}
              </Tag>
            ))}
          </Flex>
        </VStack>
        <Box spacing={4} mt={3}>
          <Button colorScheme='blue'>
            <FaShareAlt /> Share
          </Button>
        </Box>
      </Flex>

      <Box mt={5} width='75%'>
        <Heading size='md' mb={3}>
          Songs List
        </Heading>

        <Table.Root variant='simple' width='100%' borderRadius='8px'>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Song/Artist</Table.ColumnHeader>
              {!isMobile && (
                <>
                  <Table.ColumnHeader>Date Added</Table.ColumnHeader>
                  <Table.ColumnHeader>Length</Table.ColumnHeader>
                </>
              )}
              <Table.ColumnHeader>Playlist</Table.ColumnHeader>
              <Table.ColumnHeader>Download</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {songs.map((song, index) => (
              <Table.Row
                key={index}
                _hover={{ backgroundColor: 'gray.100' }}
                transition='background-color 0.3s'
                onMouseEnter={() => setExpandedRow(index)}
                onMouseLeave={() => setExpandedRow(null)}
              >
                <Table.Cell>
                  <HStack>
                    <Image
                      src={song.album_art_thumbnail_url}
                      boxSize='100px'
                      objectFit='cover'
                      borderRadius='8px'
                    />
                    <VStack align='start'>
                      <Text fontWeight='bold'>{song.name}</Text>
                      <Text fontSize='sm' color='gray.500'>
                        {song.artist_name}
                      </Text>
                      <Table.Row>
                        <Table.Cell colSpan={6} padding='0'>
                          <Collapsible.Root open={expandedRow === index}>
                            <Collapsible.Content>
                              <HStack
                                gap={0}
                                paddingLeft='10px'
                                paddingRight='10px'
                              >
                                {song.creators.map((creator, idx) => (
                                  <Box
                                    key={idx}
                                    position='relative'
                                    textAlign='center'
                                    _hover={{
                                      marginRight: '6px',
                                      zIndex: { idx }
                                    }}
                                    transition='margin 0.2s'
                                    margin='0 -8px'
                                  >
                                    <Image
                                      src={creator.profile_image_url}
                                      boxSize='40px'
                                      objectFit='cover'
                                      borderRadius='full'
                                      border='2px solid'
                                      borderColor='gray.200'
                                    />
                                  </Box>
                                ))}
                                {song.total_creators_count > 5 && (
                                  <Box
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    boxSize='40px'
                                    borderRadius='full'
                                    bg='yellow.400'
                                    fontSize='sm'
                                    fontWeight='bold'
                                    color='black'
                                    border='2px solid'
                                    borderColor='gray.200'
                                    zIndex='6'
                                    margin='0 -8px'
                                  >
                                    +{song.total_creators_count - 5}
                                  </Box>
                                )}
                              </HStack>
                            </Collapsible.Content>
                          </Collapsible.Root>
                        </Table.Cell>
                      </Table.Row>
                    </VStack>
                  </HStack>
                </Table.Cell>

                {!isMobile && (
                  <>
                    <Table.Cell>
                      {new Date(playlist.created_at).toLocaleDateString(
                        'en-US',
                        {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }
                      )}
                    </Table.Cell>
                    <Table.Cell>{song.duration}</Table.Cell>
                  </>
                )}
                <Table.Cell>
                  <IconButton variant='ghost' _hover={{ color: '#63ffbd' }}>
                    <FaPlusCircle />
                  </IconButton>
                </Table.Cell>
                <Table.Cell>
                  <IconButton
                    variant='ghost'
                    _hover={{ color: '#63ffbd' }}
                    onClick={() => {}}
                  >
                    <FaDownload />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    </Box>
  )
}

export default PlaylistPreview

import React, { useState, useEffect } from 'react'
import {
  Box,
  Text,
  Image,
  Flex,
  Heading,
  Button,
} from '@chakra-ui/react'
import { useDrag, useDrop } from 'react-dnd'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/common/Loading'
import baseAxios from '../utils/axios'

const ItemType = 'playlist'
const PlaylistPage = () => {
  const [playlists, setPlaylists] = useState(null)

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await baseAxios.get(
          'projects?featured_only=true&featured_type=normal'
        )
        // console.log({ response })
        setPlaylists(response.items)
      } catch (err) {
        console.error(err)
      }
    }

    fetchPlaylists()
  }, [])

  const navigate = useNavigate()

  const movePlaylist = (draggedIndex, droppedIndex) => {
    const updatedPlaylists = [...playlists]

    const [draggedItem] = updatedPlaylists.splice(draggedIndex, 1)
    updatedPlaylists.splice(droppedIndex, 0, draggedItem)

    setPlaylists(updatedPlaylists)
  }

  const PlaylistItem = ({ playlist, index, movePlaylist }) => {
    const handleViewPlaylist = () => {
      navigate(`/playlist/${playlist.id}`, {
        state: { playlist }
      })
    }

    const [{ isDragging }, drag] = useDrag({
      type: ItemType,
      item: { id: playlist.id, index },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    })

    const [{ isOver }, drop] = useDrop({
      accept: ItemType,
      hover: item => {
        if (item.index !== index) {
          movePlaylist(item.index, index)
          item.index = index
        }
      },
      collect: monitor => ({
        isOver: monitor.isOver()
      })
    })

    return (
      <Flex
        direction='column'
        justify='center'
        align='center'
        gap={0}
        width='31%'
        aspectRatio='1'
      >
        <Box
          ref={node => drag(drop(node))}
          position='relative'
          display='inline-block'
          margin='10px'
          borderRadius='8px'
          overflow='hidden'
          boxShadow='lg'
          opacity={isDragging ? 0.5 : 1}
          transition='opacity 0.3s'
          _hover={{
            '& .overlay': {
              opacity: 1
            }
          }}
        >
          <Image
            src={playlist.art_file_url ?? 'https://via.placeholder.com/500'}
            width='100%'
            height='100%'
            objectFit='cover'
            borderRadius='8px'
          />

          <Box
            className='overlay'
            position='absolute'
            top='0'
            left='0'
            width='100%'
            height='100%'
            backgroundColor='rgba(0, 0, 0, 0.5)'
            display='flex'
            justifyContent='center'
            alignItems='center'
            opacity='0'
            transition='opacity 0.3s'
          >
            <Button colorScheme='teal' size='lg' onClick={handleViewPlaylist}>
              View Playlist
            </Button>
          </Box>
        </Box>
        <Text textAlign='center'>{playlist.name}</Text>
        <Text textAlign='center'>By {playlist.user.profile_name}</Text>
      </Flex>
    )
  }

  return (
    <>
      {playlists ? (
        <Box p={4}>
          <Heading mb={6}>Your Playlists</Heading>
          <Flex wrap='wrap' gap={5}>
            {playlists.map((playlist, index) => (
              <PlaylistItem
                key={playlist.id}
                index={index}
                playlist={playlist}
                movePlaylist={movePlaylist}
              />
            ))}
          </Flex>
        </Box>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default PlaylistPage

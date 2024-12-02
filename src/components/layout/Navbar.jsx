import React, { useState } from 'react'
import { Flex, Box, Text, Button, Input } from '@chakra-ui/react'
import { Switch } from '../ui/switch'
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle
} from '../ui/dialog'
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '../ui/menu'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { FiSearch } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { ColorModeButton } from '../ui/color-mode'

const plans = {
  free: {
    benefs: [
      'Limited song & SFX access',
      'Safe YouTube & social media',
      'Limited downloads per month',
      '2 Personal Playlists',
      'Access to our community Discord'
    ],
    price: { monthly: '0$', yearly: '0$' }
  },
  premium: {
    benefs: [
      'Access to all songs',
      'Unlimited Downloads',
      'Safe for podcasts',
      'Unlimited Personal Playlists',
      '100s of Curated Song Collections',
      'Premium SFX',
      'Premium Creator Perks',
      'Premium access to our Discord'
    ],
    price: { monthly: '8.99$', yearly: '69.99$' },
    bgColor: '#f21b91'
  },
  pro: {
    benefs: [
      'Everything in Premium',
      'Unlimited YouTube Channels',
      'High Quality & Instrumental Versions',
      'Early access to new song drops',
      'Invite team members',
      'Unlimited SFX & SFX Packs',
      'All Creators Perks & Discounts'
    ],
    price: { monthly: '24.99$', yearly: '239.99$' },
    borderColor: '#f21b91'
  }
}

function Navbar ({ colors, navBarHeight, fonts }) {
  const navigate = useNavigate()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [checked, setChecked] = useState(false)
  const [expandedPlan, setExpandedPlan] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchPreviewOpen, setIsSearchPreviewOpen] = useState(false)

  const searchResults = []

  const handleSearchChange = e => {
    setSearchQuery(e.target.value)
    if (e.target.value.length > 0) {
      setIsSearchPreviewOpen(true)
    } else {
      setIsSearchPreviewOpen(false)
    }
  }

  const handleSearchClick = () => {
    setIsSearchPreviewOpen(true)
  }

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen)
  const toggleExpand = plan =>
    setExpandedPlan(prevPlan => ({
      ...prevPlan,
      [plan]: !prevPlan[plan] ?? true
    }))

  return (
    <Flex
      boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
      position='fixed'
      top={0}
      right={0}
      zIndex={999}
      p={4}
      align='center'
      width='100%'
      height={navBarHeight}
      bg={colors.primary}
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      padding='1rem'
    >
      <Box w='20%' onClick={() => navigate('/')} cursor='pointer'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 356 60'>
          <path
            d='M183.109 17.305l11.049 23.857H172.06l11.049-23.857zm-6.994 21.279h13.99l-6.996-15.14-6.994 15.14zM63.497 17.918h16.246v2.578H72.91v20.666h-2.578V20.496h-6.834v-2.578zm40.185 13.301H91.078v9.943H88.5V17.918h2.578V28.64h12.604V17.918h2.578v23.244h-2.578V31.22zm15.592-2.62h10.148v2.579h-10.19v7.406h12.81v2.578h-15.387V17.918h15.386v2.578h-12.767V28.6zm44.645-11.294v23.857h-2.578V24.628l-8.47 10.029-8.471-10.029v16.534h-2.578V17.305l11.049 13.257 11.048-13.257zm34.546.613h16.246v2.578h-6.834v20.666H205.3V20.496h-6.834v-2.578zm25.001 0h2.579v23.244h-2.579V17.918zm29.997 4.214a8.266 8.266 0 0 0-2.907-1.493 12.199 12.199 0 0 0-3.273-.428c-1.282 0-2.49.244-3.622.736a9.21 9.21 0 0 0-2.945 2.004c-.833.847-1.496 1.842-1.986 2.989s-.736 2.358-.736 3.642c0 1.282.246 2.496.736 3.64a9.558 9.558 0 0 0 1.986 2.99 9.211 9.211 0 0 0 2.945 2.002c1.132.493 2.34.74 3.622.74.49 0 1.03-.036 1.616-.103.587-.068 1.208-.205 1.863-.41s1.314-.49 1.985-.86a9.141 9.141 0 0 0 1.9-1.411l1.353 1.8a8.878 8.878 0 0 1-3.828 2.6c-1.513.53-3.13.797-4.848.797-1.637 0-3.18-.313-4.625-.941a12.267 12.267 0 0 1-3.784-2.537c-1.08-1.065-1.93-2.32-2.558-3.766s-.941-2.986-.941-4.623.314-3.18.941-4.625c.628-1.446 1.473-2.702 2.537-3.763a12.094 12.094 0 0 1 3.764-2.54 11.541 11.541 0 0 1 4.625-.939c1.39 0 2.775.252 4.153.757 1.379.504 2.584 1.164 3.622 1.983l-1.595 1.76z'
            fill='#fff'
          />
          <path
            d='M29.41 1.556c-.032-.052-.116-.052-.147 0L20.34 17.013a.645.645 0 0 0-.499 0l-2.156-3.733c-.03-.053-.114-.053-.144 0l-7.11 12.315a.647.647 0 0 0-.25-.05.636.636 0 0 0-.389.142l-8.134-8.134a.084.084 0 0 0-.132.102l6.745 11.681-6.744 11.681a.08.08 0 0 0 0 .084.082.082 0 0 0 .072.042h13.488l2.454 4.25a.083.083 0 0 0 .072.041c.01 0 .022-.002.032-.006a.084.084 0 0 0 .05-.099l-1.123-4.186h16.422c.032.233.176.43.386.516l-4.125 15.393c-.01.04.01.083.049.1.01.003.022.005.032.005a.086.086 0 0 0 .073-.041l16.015-27.738a.087.087 0 0 0 0-.084L29.409 1.556z'
            fill='#fff'
          />
        </svg>
      </Box>

      <Button
        borderRadius='full'
        onClick={toggleDialog}
        bg='#DEF244'
        fontSize='1rem'
        color='black'
        marginRight='2rem'
      >
        Upgrade Plan
      </Button>

      <DialogRoot
        open={isDialogOpen}
        onOpenChange={e => setIsDialogOpen(e?.open)}
      >
        <DialogContent maxWidth='80%'>
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>Take your content to the next level ✌️</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Flex justify='center' align='center' mb='5px'>
              <Text fontFamily={fonts.main}>Billed Yearly</Text>
              <Switch
                checked={checked}
                onCheckedChange={e => setChecked(e.checked)}
              />
              <Text fontFamily={fonts.main}>Billed Monthly</Text>
            </Flex>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justify='center'
              align='center'
              gap={8}
            >
              {/* <Flex direction='row' gap={6} mt={6}> */}
              <Box
                key={'free'}
                flex='1'
                p={6}
                border='1px solid'
                borderColor={colors.border}
                borderRadius='lg'
                shadow='md'
              >
                <Text>Free Plan</Text>
                <Text fontSize='xl'>
                  {plans.free.price[checked ? 'monthly' : 'yearly']}
                </Text>
                <Text fontSize='md'>per {checked ? 'month' : 'year'}</Text>
                <Text>Features:</Text>
                <ul>
                  {plans.free.benefs.map((benef, idx) => (
                    <li key={idx}>{benef}</li>
                  ))}
                </ul>
              </Box>
              {['premium', 'pro'].map(plan => (
                <Box
                  key={plan}
                  flex='1'
                  p={6}
                  bg={plans[plan].bgColor ?? 'white'}
                  border='1px solid'
                  borderColor={plans[plan].borderColor ?? colors.border}
                  borderRadius='lg'
                  shadow='md'
                >
                  <Text>
                    {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
                  </Text>
                  <Text fontSize='xl'>
                    {plans[plan].price[checked ? 'monthly' : 'yearly']}
                  </Text>
                  <Text fontSize='md'>per {checked ? 'month' : 'year'}</Text>
                  <Text>Features:</Text>
                  <ul>
                    {plans[plan].benefs.slice(0, 5).map((benef, idx) => (
                      <li key={idx}>{benef}</li>
                    ))}
                  </ul>
                  {plans[plan].benefs.length > 5 && (
                    <Button
                      onClick={() => toggleExpand(plan)}
                      display='flex'
                      alignItems='center'
                      bg='transparent'
                      color='black'
                    >
                      {expandedPlan[plan] ? (
                        <IoIosArrowUp style={{ marginLeft: '8px' }} />
                      ) : (
                        <IoIosArrowDown style={{ marginLeft: '8px' }} />
                      )}
                      {expandedPlan[plan] ? 'Show Less' : 'Show More'}
                    </Button>
                  )}

                  {expandedPlan[plan] && (
                    <ul>
                      {plans[plan].benefs.slice(5).map((benef, idx) => (
                        <li key={idx}>{benef}</li>
                      ))}
                    </ul>
                  )}
                  <Box
                    justifyContent='center'
                    alignItems='center'
                    w='100%'
                    display='flex'
                  >
                    <Button
                      borderRadius='full'
                      onClick={() => {}}
                      width='auto'
                      padding='0.4rem 15px'
                    >
                      Choose Plan
                    </Button>
                  </Box>
                </Box>
              ))}
              {/* </Flex> */}
            </Flex>
          </DialogBody>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </DialogRoot>

      <Box
        display='flex'
        alignItems='center'
        position='relative'
        flex='1'
        width='100%'
        overflow='hidden'
        borderRadius='full'
      >
        <Input
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchClick}
          placeholder='Search'
          borderRadius='full'
          padding='0.4rem 2rem 0.4rem 1rem'
          width='100%'
          bg='white'
        />
        <Box
          position='absolute'
          top='0'
          right='0'
          bg='green.500'
          height='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
          paddingLeft='10px'
          paddingRight='10px'
        >
          <FiSearch color='white' />
        </Box>
      </Box>

      {isSearchPreviewOpen && (
        <Box
          position='absolute'
          top='100%'
          left='50%'
          transform='translateX(-50%)'
          width='70%'
          boxShadow='lg'
          borderRadius='md'
          backgroundColor='white'
          mt={2}
          zIndex='9999'
        >
          <Box p={4}>
            <Text fontSize='lg' fontWeight='bold'>
              Your Searches
            </Text>
            {searchResults.length > 0 ? (
              <Flex direction='column'>
                {searchResults.map((result, index) => (
                  <Box key={index} py={2}>
                    <Text>{result}</Text>
                  </Box>
                ))}
              </Flex>
            ) : (
              <Text>No matches</Text>
            )}
          </Box>
        </Box>
      )}
      <Box display='flex' alignItems='center' gap='1rem'>
        <Button variant='link' color='white'>
          Discover
        </Button>
        <Button variant='link' color='white'>
          Songs
        </Button>
        <Button
          variant='link'
          color='white'
          onClick={() => navigate('/playlists')}
        >
          Playlists
        </Button>
      </Box>

      <Text>105 Points</Text>

      <MenuRoot positioning={{ placement: 'right-start' }}>
        <MenuTrigger asChild>
          <Button
            variant='outline'
            size='sm'
            color='white'
            borderColor='#f21b91'
          >
            Rachida El Hady
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem value='Licenses'>Licenses & Downloads</MenuItem>
          <MenuItem value='Playlists'>My Playlists</MenuItem>
          <MenuItem value='Trackfluencer'>Trackfluencer</MenuItem>
          <MenuItem value='Points'>Your Points</MenuItem>
          <MenuItem value='Settings'>Settings</MenuItem>
          <MenuItem value='Logout'>Logout</MenuItem>
        </MenuContent>
      </MenuRoot>
      {/* <ColorModeButton/> */}
    </Flex>
  )
}

export default Navbar

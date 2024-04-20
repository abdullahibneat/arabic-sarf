import '../styles/Sidebar.scss'

import Accordion, { AccordionGroup, AccordionGroupItem } from './Accordion'
import { useCallback, useMemo, useState } from 'preact/hooks'
import { useLocation, useRoute } from 'preact-iso'

import Flex from './Flex'
import IconButton from './IconButton'
import MenuItem from './MenuItem'
import SettingsModal from '../modals/SettingsModal'
import Text from './Text'
import isMujarrad from '../helpers/isMujarrad'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import useModal from '../hooks/useModal'
import verbTypes from '../../data'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const modal = useModal()
  const location = useLocation()
  const params = useRoute().params

  const { settings } = useAppState()

  const activeItemId = useMemo(() => {
    if (params.chapter)
      return `/${params.type}/${params.form}/${params.chapter}`
    if (params.form) return `/${params.type}/${params.form}`
    if (params.type) return `/${params.type}`
    return null
  }, [params])

  const accordionData = useMemo(() => {
    const accordionGroups: AccordionGroup[] = []

    for (const type of Object.keys(verbTypes)) {
      if (settings.hiddenVerbTypes.includes(type)) {
        continue
      }

      const verbType = verbTypes[type]!

      const items: AccordionGroupItem[] = [
        {
          id: `/${type}`,
          title: 'Overview',
          tag: 'All',
        },
      ]

      for (const chapter of Object.values(verbType)) {
        if (isMujarrad(chapter)) {
          const letters = ['a', 'b', 'c', 'd', 'e', 'f']

          for (const [$chapter, mujarradChapter] of Object.entries(chapter)) {
            items.push({
              id: `/${type}/${mujarradChapter?.form}/${$chapter}`,
              title: replaceRoots(mujarradChapter!).title,
              tag: `1${letters.shift()}`,
            })
          }
        } else if (chapter) {
          items.push({
            id: `/${type}/${chapter.form}`,
            title: replaceRoots(chapter).title,
            tag: chapter.form,
          })
        }
      }

      accordionGroups.push({
        id: type,
        title: type,
        items,
      })
    }

    return accordionGroups
  }, [settings.hiddenVerbTypes])

  const goToHomepage = useCallback(() => {
    location.route('/')
    setOpen(false)
  }, [])

  const goToVerb = useCallback((item: AccordionGroupItem) => {
    location.route(item.id)
    setOpen(false)
  }, [])

  const openSettings = useCallback(() => {
    modal.open({
      title: 'Settings',
      children: <SettingsModal />,
    })
  }, [])

  return (
    <aside class={open ? 'open' : ''}>
      <div class="header">
        <Text type="h2">صرف</Text>

        <div class="mobile-menu">
          <IconButton
            name={open ? 'close' : 'menu'}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      <Flex flex={1} column gap={8} padding="16px 24px" overflow="auto">
        <MenuItem
          active={location.path === '/'}
          title="All Tasreefs"
          onClick={goToHomepage}
        />

        <Accordion
          data={accordionData}
          activeGroupId={params.type}
          activeItemId={activeItemId}
          onPressGroupItem={goToVerb}
        />
      </Flex>

      <Flex class="footer" alignItems="stretch">
        <Flex flex={1} />
        <Flex
          justifyContent="center"
          alignItems="center"
          borderLeft="solid 1px var(--border)"
          padding="0 8px"
        >
          <IconButton name="settings" onClick={openSettings} />
        </Flex>
      </Flex>
    </aside>
  )
}

export default Sidebar

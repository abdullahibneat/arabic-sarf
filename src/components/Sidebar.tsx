import '../styles/Sidebar.scss'

import Accordion, { AccordionGroup, AccordionGroupItem } from './Accordion'
import { useCallback, useMemo, useState } from 'preact/hooks'

import Flex from './Flex'
import IconButton from './IconButton'
import MenuItem from './MenuItem'
import SettingsModal from '../modals/SettingsModal'
import Text from './Text'
import getMazeedFihiChapterHeading from '../helpers/getMazeedFihiChapterHeading'
import getMujarradChapterHeading from '../helpers/getMujarradChapterHeading'
import isMujarrad from '../helpers/isMujarrad'
import replaceRoots from '../helpers/replaceRoots'
import useAppState from '../hooks/useAppState'
import { useLocation } from 'preact-iso'
import useModal from '../hooks/useModal'
import verbTypes from '../../data'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const modal = useModal()
  const location = useLocation()
  const [type, form, chapter] = location.url.substring(1).split('/')

  const { settings } = useAppState()

  const activeItemId = useMemo(() => {
    if (chapter) return `/${type}/${form}/${chapter}`
    if (form) return `/${type}/${form}`
    if (type) return `/${type}`
    return null
  }, [type, form, chapter])

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
          for (const [$chapter, mujarradChapter] of Object.entries(chapter)) {
            items.push({
              id: `/${type}/${mujarradChapter?.form}/${$chapter}`,
              title: replaceRoots(mujarradChapter!).title,
              tag: getMujarradChapterHeading(mujarradChapter!.باب),
            })
          }
        } else if (chapter) {
          items.push({
            id: `/${type}/${chapter.form}`,
            title: replaceRoots(chapter).title,
            tag: getMazeedFihiChapterHeading(chapter.form),
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
  }, [
    settings.hiddenVerbTypes,
    settings.mujarradChapterHeadings,
    settings.mazeedFihiChapterHeadings,
  ])

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

      <div class="sidebar-content">
        <Flex column gap={8}>
          <MenuItem
            active={location.path === '/'}
            title="All Tasreefs"
            onClick={goToHomepage}
          />

          <Accordion
            data={accordionData}
            activeGroupId={type}
            activeItemId={activeItemId}
            onPressGroupItem={goToVerb}
          />
        </Flex>
      </div>

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

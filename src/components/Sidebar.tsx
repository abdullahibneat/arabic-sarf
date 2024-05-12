import '../styles/Sidebar.scss'

import Accordion, { AccordionGroup, AccordionGroupItem } from './Accordion'
import { useCallback, useMemo, useState } from 'preact/hooks'
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

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
import useModal from '../hooks/useModal'
import verbTypes from '../../data'

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  const modal = useModal()
  const location = useLocation()
  const navigate = useNavigate()
  const [search] = useSearchParams()

  const { type, form, chapter } = useParams()

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
    navigate('/', {})
    setOpen(false)
  }, [navigate])

  const goToVerb = useCallback(
    (item: AccordionGroupItem) => {
      navigate({ pathname: item.id, search: '?' + search.toString() })
      setOpen(false)
    },
    [navigate, search],
  )

  const openSettings = useCallback(() => {
    modal.open({
      title: 'Settings',
      maxWidth: 400,
      children: <SettingsModal />,
    })
  }, [])

  return (
    <aside class={open ? 'open' : ''}>
      <div class="header">
        <div class="logo">
          <Text type="h2">صرف</Text>
        </div>

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
            active={location.pathname === '/'}
            title="All Tasreefs"
            onClick={goToHomepage}
          />

          <Accordion
            data={accordionData}
            activeGroupId={type ? decodeURI(type) : null}
            activeItemId={activeItemId ? decodeURI(activeItemId) : null}
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

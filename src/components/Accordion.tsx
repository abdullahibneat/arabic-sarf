import '../styles/Accordion.scss'

import { useCallback, useEffect, useState } from 'preact/hooks'

import Flex from './Flex'
import MenuItem from './MenuItem'

export type AccordionGroup = {
  id: string
  title: string
  items: AccordionGroupItem[]
}

export type AccordionGroupItem = {
  id: string
  title: string
  tag?: string | number
}

type Props = {
  data: AccordionGroup[]
  activeGroupId?: string | null
  activeItemId?: string | null
  onPressGroup?: (group: AccordionGroup) => void
  onPressGroupItem?: (item: AccordionGroupItem) => void
}

const Accordion = ({
  data,
  activeGroupId,
  activeItemId,
  onPressGroup,
  onPressGroupItem,
}: Props) => {
  return (
    <Flex column gap={8}>
      {data.map((group, i) => (
        <AccordionGroup
          key={group.id}
          group={group}
          activeGroupId={activeGroupId}
          activeItemId={activeItemId}
          onPressGroup={onPressGroup}
          onPressGroupItem={onPressGroupItem}
        />
      ))}
    </Flex>
  )
}

export default Accordion

const AccordionGroup = ({
  group,
  activeGroupId,
  activeItemId,
  onPressGroup,
  onPressGroupItem,
}: {
  group: AccordionGroup
  activeGroupId?: string | null
  activeItemId?: string | null
  onPressGroup?: (group: AccordionGroup) => void
  onPressGroupItem?: (item: AccordionGroupItem) => void
}) => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (activeGroupId && group.id === activeGroupId) {
      setOpen(true)
    }
  }, [activeGroupId])

  const handleGroupPress = useCallback(() => {
    setOpen((open) => !open)
    onPressGroup?.(group)
  }, [onPressGroup])

  const handleItemPress = useCallback(
    (item: AccordionGroupItem) => () => {
      onPressGroupItem?.(item)
    },
    [onPressGroupItem],
  )

  return (
    <div
      class={`accordion-group ${open ? 'open' : ''} ${group.id === activeGroupId ? 'active' : ''}`}
    >
      <MenuItem
        title={group.title}
        icon={open ? 'chevron-down' : 'chevron-left'}
        onClick={handleGroupPress}
      />

      <div class="content-wrapper">
        <div class="content">
          <Flex column gap={8} padding={8}>
            {group.items.map((item) => (
              <MenuItem
                key={item.id}
                active={item.id === activeItemId}
                title={item.title}
                tag={item.tag}
                onClick={handleItemPress(item)}
              />
            ))}
          </Flex>
        </div>
      </div>
    </div>
  )
}

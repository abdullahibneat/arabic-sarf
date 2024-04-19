import '../styles/Accordion.scss'

import Flex from './Flex'
import MenuItem from './MenuItem'
import { useState } from 'preact/hooks'

export type AccordionGroup = {
  id: string
  title: string
  items: AccordionGroupItem[]
}

export type AccordionGroupItem = {
  id: string
  title: string
}

type Props = {
  data: AccordionGroup[]
}

const Accordion = ({ data }: Props) => {
  return (
    <Flex column gap={8}>
      {data.map((group) => (
        <AccordionGroup key={group.id} group={group} />
      ))}
    </Flex>
  )
}

export default Accordion

const AccordionGroup = ({ group }: { group: AccordionGroup }) => {
  const [open, setOpen] = useState(false)

  return (
    <div class="accordion-group">
      <MenuItem
        active={open}
        title={group.title}
        icon={open ? 'chevron-down' : 'chevron-left'}
        onClick={() => setOpen(!open)}
      />

      <div class={`content-wrapper ${open ? 'open' : ''}`}>
        <div class="content">
          <Flex column gap={8} padding={8}>
            {group.items.map((item) => (
              <MenuItem key={item.id} title={item.title} />
            ))}
          </Flex>
        </div>
      </div>
    </div>
  )
}

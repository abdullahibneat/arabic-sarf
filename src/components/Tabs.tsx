import '../styles/Tabs.scss'

import Text from './Text'
import { useMemo } from 'preact/hooks'

type Props = {
  tabs: string[]
  activeTab?: string
  onTabClick?: (tab: string) => void
}

const Tabs = ({ tabs, activeTab, onTabClick }: Props) => {
  const activeIndex = useMemo(
    () => (activeTab ? Math.max(tabs.indexOf(activeTab), 0) : -1),
    [activeTab, tabs],
  )

  return (
    <div class="tabs-container">
      {tabs.map((tab, index) => (
        <div
          class={`tab ${index === activeIndex ? 'active' : ''}`}
          key={tab}
          onClick={() => onTabClick?.(tab)}
        >
          <Text type="small-bold" style={{ color: 'inherit' }}>
            {tab}
          </Text>
        </div>
      ))}

      {activeIndex > -1 && (
        <div
          class="active-indicator"
          style={{
            width: `${(1 / tabs.length) * 100}%`,
            left: `${(activeIndex / tabs.length) * 100}%`,
          }}
          data-active-index={activeIndex}
        />
      )}
    </div>
  )
}

export default Tabs

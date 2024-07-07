import '../styles/List.scss'

import Text from './Text'
import { useMemo } from 'preact/hooks'

export type ListCell = {
  prefix?: string
  text: string
}

export type ListSection = Array<string | ListCell>

type ProcessedSection = ListCell[]

type ListProps = {
  header?: string
} & (
  | { cells: ListSection; sections?: never }
  | { sections: ListSection[]; cells?: never }
)

const List = ({ header, cells, sections }: ListProps) => {
  const processedSections = useMemo<ProcessedSection[]>(() => {
    const processSection = (section: ListSection) => {
      const $section: ProcessedSection = []
      for (const cell of section) {
        if (typeof cell === 'string') {
          $section.push({ text: cell })
        } else {
          $section.push(cell)
        }
      }
      return $section
    }

    if (sections)
      return sections
        .map(processSection)
        .filter((section) => section.length > 0)
    return [processSection(cells)].filter((section) => section.length > 0)
  }, [cells, sections])

  return (
    <div class="list">
      {header && <div class="list-cell list-header">{header}</div>}

      {processedSections.length === 0 && (
        <div class="not-found">
          <Text color="text-secondary">N/A</Text>
        </div>
      )}

      {processedSections.map((section, i) => (
        <div key={`section-${i}`} class="list-section">
          {section.map((cell, j) => (
            <div key={`cell-${j}`} class="list-cell">
              {cell.prefix && <div class="list-cell-prefix">{cell.prefix}</div>}
              <div class="list-cell-content">{cell.text}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default List

import cx from 'classix'
import { twMerge } from 'tailwind-merge'
import { useMemo } from 'react'

export type TableCell = {
  annotation?: string | number | null
  content: string
}

export type TableProps = {
  header?: string | null
  data: (TableCell | string)[][][]
  column?: boolean
}

const Table = ({ header, data, column }: TableProps) => {
  const tableData = useMemo<TableCell[][][]>(
    () =>
      data.map((row) =>
        row.map((section) =>
          section.map((cell) =>
            typeof cell === 'string' ? { content: cell } : cell,
          ),
        ),
      ),
    [data],
  )

  return (
    <div
      dir="ltr"
      className={twMerge(
        cx('flex w-80 flex-shrink-0 flex-col gap-1', column && 'w-44'),
      )}
    >
      {header && (
        <div className="flex h-8 items-center justify-center rounded-md border-[1px] border-zinc-300 bg-zinc-300">
          {header}
        </div>
      )}

      <div className="flex flex-col gap-1">
        {tableData.map((row, rowIndex) => (
          <Row key={rowIndex} column={column}>
            {(column ? row : [...row].reverse()).map(
              (section, sectionIndex) => (
                <Section key={sectionIndex} column={column}>
                  {section.map((cell, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      annotation={cell.annotation}
                      alignAnnotation={
                        column || row.length === 1 || sectionIndex === 1
                          ? 'right'
                          : 'left'
                      }
                    >
                      {cell.content}
                    </Cell>
                  ))}
                </Section>
              ),
            )}
          </Row>
        ))}
      </div>
    </div>
  )
}

export default Table

const Row = ({
  column,
  children,
}: {
  column?: boolean
  children: React.ReactNode
}) => (
  <div className={twMerge(cx('flex gap-1', column && 'flex-col'))}>
    {children}
  </div>
)

const Section = ({
  column,
  children,
}: {
  column?: boolean
  children: React.ReactNode
}) => (
  <div
    className={twMerge(
      cx(
        'flex flex-col divide-y rounded-md border-[1px] border-zinc-300',
        !column && 'flex-grow',
      ),
    )}
  >
    {children}
  </div>
)

const Cell = ({
  annotation,
  alignAnnotation = 'right',
  children,
}: {
  annotation?: string | number | null
  alignAnnotation?: 'left' | 'right'
  children: React.ReactNode
}) => (
  <div className="relative flex h-8 items-center justify-center">
    {children}
    {annotation != null && (
      <div
        className={twMerge(
          cx(
            'absolute bottom-0 top-0 flex w-4 select-none items-center justify-center text-sm text-zinc-300',
            alignAnnotation === 'left' && 'left-2',
            alignAnnotation === 'right' && 'right-2',
          ),
        )}
      >
        {annotation}
      </div>
    )}
  </div>
)

import { GridCell } from '.'
import { useCallback } from 'preact/hooks'

type Props = {
  cell: GridCell
  onCellClick?: (cell: GridCell) => void
}

const Cell = ({ cell, onCellClick }: Props) => {
  const handleClick = useCallback(
    () => onCellClick?.(cell),
    [cell, onCellClick],
  )

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault()
      if (e.key === 'Enter' || e.key === ' ') onCellClick?.(cell)
    },
    [onCellClick, cell],
  )

  return (
    <div
      class="cell"
      disabled={cell.disabled}
      tabindex={0}
      onClick={handleClick}
      onKeyPress={handleKeyPress}
    >
      {cell.pre && <small>{cell.pre}</small>}
      <h2>{cell.heading}</h2>
      {cell.description && <p>{cell.description}</p>}
    </div>
  )
}

export default Cell

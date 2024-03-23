import Cell from './Cell'
import './GridStyles.scss'
import { JSX } from 'preact'

export type GridCell = {
  id: string
  pre?: string | JSX.Element
  heading?: string
  description?: string
  disabled?: boolean
}

type Props = {
  cells: GridCell[]
  rtl?: boolean
  onCellClick?: (cell: GridCell) => void
}

const Grid = ({ cells, rtl, onCellClick }: Props) => (
  <div class="grid" style={{ direction: rtl ? 'rtl' : undefined }}>
    {cells.map((cell) => (
      <Cell key={cell.id} cell={cell} onCellClick={onCellClick} />
    ))}
  </div>
)

export default Grid

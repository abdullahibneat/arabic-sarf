import { ToolbarContext } from '../contexts/ToolbarContext'
import { useContext } from 'preact/hooks'

const useToolbar = () => useContext(ToolbarContext)

export default useToolbar

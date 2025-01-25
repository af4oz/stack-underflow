import { AnsSortBy } from '../../types'
import { TabGroupItem, TabGroup } from '../my-mui/Misc'

interface SortAnsBarProps {
  sortBy: AnsSortBy
  setSortBy: (...args: any) => void
}

const SortAnsBar = ({ sortBy, setSortBy }: SortAnsBarProps) => {
  const handleSortChange = (e: React.MouseEvent) => {
    setSortBy((e.target as HTMLButtonElement).innerText.toUpperCase())
  }

  return (
    <TabGroup>
      <TabGroupItem active={sortBy === 'VOTES'} onClick={handleSortChange}>
        Votes
      </TabGroupItem>
      <TabGroupItem active={sortBy === 'NEWEST'} onClick={handleSortChange}>
        Newest
      </TabGroupItem>
      <TabGroupItem active={sortBy === 'OLDEST'} onClick={handleSortChange}>
        Oldest
      </TabGroupItem>
    </TabGroup>
  )
}

export default SortAnsBar

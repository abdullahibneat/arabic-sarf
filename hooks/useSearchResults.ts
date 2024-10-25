import Fuse, { Expression } from 'fuse.js'

import { SEARCHABLE_PATHS } from '@/helpers/getChapters'
import onlyAlphaNumeric from '@/helpers/onlyAlphaNumeric'
import { useMemo } from 'react'
import useVerbTypes from './useVerbTypes'

const useSearchResults = (search?: string | null) => {
  const verbTypes = useVerbTypes()

  const chapters = useMemo(
    () => Object.values(verbTypes).flatMap((verbType) => verbType),
    [verbTypes],
  )

  const fuse = useMemo(
    () =>
      new Fuse(chapters, {
        keys: SEARCHABLE_PATHS,
        threshold: 0, // exact matches only
        shouldSort: true, // sort by most relevant first
      }),
    [chapters],
  )

  const results = useMemo(() => {
    /**
     * Overview on how the search works:
     *
     * 1. Split the search string into words, filter out any empty strings or blacklisted words, and remove any non-alphanumeric characters.
     * 2. For each search term, create an expression to look up paths that contain the search term.
     * 3. The `$or` operator is then used so that the query returns any items that contain the search term in any of the specified paths to search.
     * 4. Finally, the `$and` operator is used to filter down items that contain all the search terms in any of the specified paths to search.
     */
    if (!search) return []

    const blacklist = ['form']

    const searchTerms = search
      .toLocaleLowerCase()
      .split(' ')
      .filter((term) => !!term && !blacklist.includes(term))
      .map((term) => onlyAlphaNumeric(term))

    const searchTermQueries: Expression[] = []

    for (const searchTerm of searchTerms) {
      const propertiesContainSearchTerm: Expression[] = []

      for (const $path of SEARCHABLE_PATHS) {
        propertiesContainSearchTerm.push({ $path, $val: searchTerm })
      }

      searchTermQueries.push({ $or: propertiesContainSearchTerm })
    }

    return fuse.search({ $and: searchTermQueries }, { limit: 10 })
  }, [fuse, search])

  return results
}

export default useSearchResults

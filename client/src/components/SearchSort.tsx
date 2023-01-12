import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import debounce from 'lodash.debounce'
import {
  Box,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { sortDataBy } from '../redux/actions/productAction'

type SearchSortProps = {
  onSearchData: (e: React.ChangeEvent<HTMLInputElement>) => void
  searchInput: string
}
const SearchSort = ({ searchInput, onSearchData }: SearchSortProps) => {
  const dispatch = useDispatch()

  const debouncedOnChange = debounce(onSearchData, 1000)

  const onSortData = (event: any) => {
    console.log('true/false', event.target.value)
    if (event.target.value === 'price(high-low)') {
      dispatch(sortDataBy('price', false))
    } else if (event.target.value === 'price(low-high)') {
      dispatch(sortDataBy('price', true))
    } else if (event.target.value === 'title(high-low)') {
      dispatch(sortDataBy('title', false))
    } else {
      dispatch(sortDataBy('title', true))
    }
  }
  return (
    <div>
      <nav className="searchSort">
        <section>
          <input
            onChange={debouncedOnChange}
            placeholder="Search…"
            className="searchSort__search"
          />
        </section>
        <section>
          <Box
            sx={{
              minWidth: 200,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select label="sortBy" onChange={onSortData}>
                <MenuItem value={'price(low-high)'}>price(low-high)</MenuItem>
                <MenuItem value={'price(high-low)'}>price(high-low)</MenuItem>
                <MenuItem value={'title(high-low)'}>name(Z-A)</MenuItem>
                <MenuItem value={'title(low-high)'}>name(A-Z)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </section>
      </nav>
    </div>
  )
}

export default SearchSort

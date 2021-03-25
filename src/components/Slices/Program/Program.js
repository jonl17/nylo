import React from 'react'
import {
  NewsOverview,
  ExhibitionOverview,
} from '~/components/Site/Overview/Overview'
import LatestEvents from '~/components/Slices/LatestEvents'
import LatestNews from '~/components/Slices/LatestNews'
import Search from '~/components/Slices/Search'

const Program = ({ primary: { programName }, ...props }) => {
  const programs = {
    AllNews: NewsOverview,
    AllExhibitions: ExhibitionOverview,
    LatestEvents,
    LatestNews,
    Search,
  }
  if (programs[programName]) {
    const Cmp = programs[programName]
    return <Cmp {...props} />
  } else {
    return <div>Error loading system named {programName}</div>
  }
}

export default Program

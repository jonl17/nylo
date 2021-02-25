import React from 'react'
import {
  NewsOverview,
  ExhibitionOverview,
} from '~/components/Site/Overview/Overview'

const Program = ({ primary: { programName }, ...props }) => {
  const programs = {
    AllNews: NewsOverview,
    AllExhibitions: ExhibitionOverview,
  }
  if (programs[programName]) {
    const Cmp = programs[programName]
    return <Cmp {...props} />
  } else {
    return <div>unhandled {programName}</div>
  }
}

export default Program

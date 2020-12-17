import React from 'react'
import AllNews from '~/components/Site/AllNews'

const Program = ({
  primary: { program_name: programName },
}: {
  primary: { program_name: string }
}) => {
  const type: { [key: string]: () => JSX.Element } = {
    AllNews,
  }
  const Cmp = type[programName]

  if (!Cmp) return null

  return <Cmp />
}

export default Program

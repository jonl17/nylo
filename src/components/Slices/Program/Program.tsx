import React from 'react'
import AllNews from '~/components/Site/Overview'

const Program = ({
  primary: { program_name: programName },
}: {
  primary: { program_name: string }
  items: { parameter_label: string; parameter_value: string }[]
}) => {
  const type: { [key: string]: () => JSX.Element } = {
    AllNews,
  }
  const Cmp = type[programName]

  if (!Cmp) return null

  return <Cmp />
}

export default Program

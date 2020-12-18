import React from 'react'
import { ProgramProps } from '~/components/Site/NavBar/types'
import Overview from '~/components/Site/Overview'

const Program = ({
  primary,
  items,
}: {
  primary: { program_name: string }
  items: { parameter_label: string; parameter_value: string }[]
}) => {
  const type: {
    [key: string]: ({ name, parameters }: ProgramProps) => JSX.Element
  } = {
    AllNews: Overview,
    AllExhibitions: Overview,
  }

  const Cmp: ({ name }: ProgramProps) => JSX.Element =
    type[primary.program_name]

  if (!Cmp) return null

  return (
    <Cmp
      name={primary.program_name}
      parameters={items.map(x => {
        return { label: x.parameter_label, value: x.parameter_value }
      })}
    />
  )
}

export default Program

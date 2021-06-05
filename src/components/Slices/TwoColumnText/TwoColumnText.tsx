import React from 'react'

type Props = {
  firstColumn: {
    html: string
  }
  secondColumn: {
    html: string
  }
}

const TwoColumnText = ({ firstColumn, secondColumn }: Props) => {
  return (
    <div className='d-xl-flex rich-text'>
      <div
        className='col-lg-6 pl-0'
        dangerouslySetInnerHTML={{ __html: firstColumn.html }}
      />
      <div
        className='col-lg-6 pl-0 pl-lg-1'
        dangerouslySetInnerHTML={{ __html: secondColumn.html }}
      />
    </div>
  )
}

export default TwoColumnText

import React from 'react'
import { Helmet } from 'react-helmet'

const Head = ({title, description, canonical}) => {
  return (
    <Helmet>
      <title>Hit Me - {title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
    </Helmet>
  )
}

export default Head
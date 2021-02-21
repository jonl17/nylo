import './src/styles/nylo.scss'
import { LanguageProvider } from '~/context/LanguageContext'
import React from 'react'

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>{element}</LanguageProvider>
)

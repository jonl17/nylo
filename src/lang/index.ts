export type Dictionary = 'Public transportation' | 'Opening hours' | 'Read more'

export type Language = 'en-us' | 'is'

export const translations: {
  [key in Dictionary]: { [key in Language]: string }
} = {
  'Public transportation': {
    is: 'Almenningssamgöngur',
    'en-us': 'Public transportation',
  },
  'Opening hours': { is: 'Opnunartímar', 'en-us': 'Opening hours' },
  'Read more': { is: 'Lesa meira', 'en-us': 'Read more' },
}

export const langSeek = (key: Dictionary, lang: Language) => {
  if (translations[key]) {
    const obj = translations[key]
    if (obj[lang]) {
      return obj[lang]
    }
  } else return key
}

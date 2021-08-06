import React, { useState, FormEvent } from 'react'
import Button from '~/components/Site/Button'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { useLanguage } from '~/context/langContext'

const PostlistSignup = () => {
  const [res, setRes] = useState({ result: null, msg: '' })

  const [email, setEmail] = useState('')

  const { lang } = useLanguage()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const r = await addToMailchimp(email, {
      MMERGE3: lang === 'en-us' ? 'English' : 'Íslenska',
    })
    setRes(r)
  }
  return (
    <div className='input input--small'>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          onChange={e => setEmail(e.target.value)}
          placeholder={lang === 'en-us' ? 'Email address' : 'Netfang'}
          className='px-2 mb-2'
        />
        <Button
          type='primary'
          label={lang === 'en-us' ? 'Subscribe' : 'Skrá á póstlista'}
        />
      </form>
      {res.msg && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: res.msg }} />
        </div>
      )}
    </div>
  )
}

export default PostlistSignup

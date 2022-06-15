import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { ChangeEvent, useState } from 'react'

import FormField from '../components/form'

const Home: NextPage = () => {
  const [encryptedCard, setCard] = useState('')

  const [infos, setInfos] = useState({
    publicKey:
      'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwlLWkoUk5zIGr5KbEvcXoeP5ovGxiaMIgObIYJYMUWWMjDseIRI3t9gh6efi2tsLq0nKIIYdfd8S6/mAET1F24gQISIOSKs4OOmg90K2Xd/o50O7V1dZh0XipCEmaQBJW6wdZaqepmf2jI9WH1PFLRrWa6jPbkVtqJorJ/+f2cGcXumpm3mK/ytKGE2C165Ec9Xqvwn03iN9BAy02BsN4UX68KFYDp41QFo6Bze+EjcSvk+2vJyzKOxZJwpRNF8WCFRQ0YnRvJNl+wpn2C2XRtkNt8oX0iwPvxmDdKWtK6RevnoXX/cJeSH3jztvKO3FGlYIbJQcZppj/u7rJsvyzwIDAQAB',
    buyerName: 'Zé da Silva',
    expMonth: 10,
    expYear: 2030,
    cvv: '123',
    cardNumber: '4111111111111111',
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id.split('_')[1]
    const value = event.target.value
    setInfos((values) => ({ ...values, [id]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    //@ts-ignore
    const card = PagSeguro.encryptCard({
      publicKey: infos.publicKey,
      holder: infos.buyerName,
      number: infos.cardNumber,
      expMonth: infos.expMonth,
      expYear: infos.expYear,
      securityCode: infos.cvv,
    })
    if (card.hasErrors) {
      card.errors.forEach((error: { code: string; message: string }) => {
        alert(error.message)
      })
    }
    navigator.clipboard.writeText(card.encryptedCard)

    setCard(
      card.encryptedCard ?? 'Ocorreu um erro ao gerar o cartão criptografado',
    )
  }
  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <a href="http://localhost:3000/next" className="hidden">
        <button>Debug</button>
      </a>

      <Script src="https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"></Script>
      <Head>
        <title>PSEncriptador</title>
        <meta
          name="description"
          content="Esse site foi criado para ser rodado localmente para Encriptar de forma fácil o jeito que a pagseguro faz com seus cartões"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full max-h-full">
        <h1>Bem vindo ao encriptador!</h1>
        <p>
          Esse projeto foi feito para ajudar a encriptar cartões usando um
          sistema que funcione e seja compativel com a PagSeguro.
        </p>
        <p>Preencha o formulário abaixo para encriptar o cartão.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-6">
            <FormField
              name="publicKey"
              placeholder="Chave Pública"
              value={infos.publicKey}
              onChange={handleChange}
              options={{ type: 'text' }}
            ></FormField>
            <FormField
              name="buyerName"
              placeholder="Nome do comprador"
              value={infos.buyerName}
              onChange={handleChange}
              options={{ type: 'text' }}
            ></FormField>
            <FormField
              name="cardNumber"
              placeholder="Numero do cartão"
              value={infos.cardNumber}
              onChange={handleChange}
              options={{ type: 'text', maxLength: 19, minLength: 13 }}
            ></FormField>
            <FormField
              name="expMonth"
              placeholder="Mês que expira"
              value={infos.expMonth}
              onChange={handleChange}
              options={{ type: 'number', maxLength: 2, minLength: 2 }}
            ></FormField>
            <FormField
              name="expYear"
              placeholder="Ano que expira"
              value={infos.expYear}
              onChange={handleChange}
              options={{ type: 'number', maxLength: 4, minLength: 4 }}
            ></FormField>
            <FormField
              name="cvv"
              placeholder="Código de segurança(cvv)"
              value={infos.cvv}
              onChange={handleChange}
              options={{ type: 'number', maxLength: 3, minLength: 3 }}
            ></FormField>
            <button
              type="submit"
              className="
              px-6
              py-3
              bg-blue-600
              text-white
              font-big
              text-xs
              leading-tight
              uppercase
              rounded
              shadow-md
              hover:bg-blue-700 hover:shadow-lg
              focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg
              transition
              duration-150
              ease-in-out"
            >
              Encriptar
            </button>
          </div>
        </form>

        <div className="flex justify-center">
          <div className="block p-6 rounded-lg shadow-lg bg-white max-w-xl min-w-full">
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
              Resultado
            </h5>
            <p className="text-gray-700 text-base mb-4 break-all h-24">
              {encryptedCard}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home

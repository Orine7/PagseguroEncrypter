import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import { ChangeEvent, useState } from 'react'

import FormField from '../components/form'
import SideBar from '../components/sidebar'

const Home: NextPage = () => {
  const [isOpen, setOpenValue] = useState(false)
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
    //navigator.clipboard.writeText(card.encryptedCard)

    setCard(
      card.encryptedCard ?? 'Ocorreu um erro ao gerar o cartão criptografado',
    )
  }
  return (
    <>
      <Script src="https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"></Script>
      <Head>
        <title>PSEncriptador</title>
        <meta
          name="description"
          content="Esse site foi criado para ser rodado localmente para Encriptar de forma fácil o jeito que a pagseguro faz com seus cartões"
        />
        <link
          rel="icon"
          href="https://assets.pagseguro.com.br/ps-bootstrap/v6.82.1/img/favicon.ico"
        />
      </Head>
      <SideBar
        isOpen={isOpen}
        onClick={(e) => {
          e.preventDefault()
          setOpenValue(!isOpen)
        }}
      />
      <button
        className="fixed top-0 left-0 m-6"
        onClick={(e) => {
          e.preventDefault()
          setOpenValue(!isOpen)
        }}
      >
        <Image src="/info.svg" alt="Info" width={50} height={50} />
      </button>
      <div className="container flex items-center justify-center min-h-screen min-w-full  bg-green-600">
        <main className="min-h-screen bg-green-100 w-6/12">
          <div className=" flex justify-center items-center">
            <div className="">
              <Image src="/pagseguro_logo.png" width={175} height={175} />
            </div>
            <div className="">
              <h1 className="text-3xl font-bold text-center text-green-900 mx-4">
                PagSeguro Encriptador
              </h1>
              <p className="text-center mx-4">
                Preencha os dados e encripte agora!
              </p>
            </div>
          </div>
          <div className="block p-6 max-w-xl min-w-full">
            <form onSubmit={handleSubmit}>
              <div>
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
                mb-4
                bg-green-300
                font-big
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-green-700 hover:shadow-lg
                focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-green-800 active:shadow-lg
                transition
                duration-150
                ease-in-out"
                >
                  Encriptar
                </button>
              </div>
            </form>
            <div>
              <h5 className=" inline-block text-xl leading-tight font-medium mb-2 pr-2">
                Resultado
              </h5>
              <button
                className="rounded-md hover:bg-green-400 hover:shadow-lg
                active:bg-green-600 active:shadow-lg ease-in-out"
                onClick={() => {
                  navigator.clipboard.writeText(encryptedCard)
                }}
              >
                <Image src="/copy.svg" alt="Copy" width={20} height={20} />
              </button>
              <p className="text-base break-all p-4 h-30 rounded-md bg-green-300 ">
                {encryptedCard}
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default Home

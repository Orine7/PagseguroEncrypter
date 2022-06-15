import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

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

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name
    const value = event.target.value

    setInfos((values) => ({ ...values, [name]: value }))
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

    setCard(
      card.encryptedCard ?? 'Ocorreu um erro ao gerar o cartão criptografado',
    )
  }
  return (
    <div className={styles.container}>
      <a href="http://localhost:3000/next">
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

      <main className={styles.main}>
        <div>
          <h1>Bem vindo ao encriptador!</h1>
          <p>
            Esse projeto foi feito para ajudar a encriptar cartões usando um
            sistema que funcione e seja compativel com a PagSeguro.
          </p>
          <p>Preencha o formulário abaixo para encriptar o cartão.</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Ponha sua chave publica:{' '}
              <input
                type="text"
                name="publicKey"
                value={infos.publicKey}
                onChange={handleChange}
              />{' '}
            </label>
            <label>
              Nome do comprador:{' '}
              <input
                type="text"
                name="buyerName"
                value={infos.buyerName}
                onChange={handleChange}
              />{' '}
            </label>
            <label>
              Numero do cartão:{' '}
              <input
                type="text"
                name="cardNumber"
                maxLength={19}
                minLength={13}
                value={infos.cardNumber}
                onChange={handleChange}
              />{' '}
            </label>
            <label>
              Mês que expira:{' '}
              <input
                type="text"
                maxLength={2}
                minLength={2}
                name="expMonth"
                value={infos.expMonth}
                onChange={handleChange}
              />{' '}
            </label>
            <label>
              Ano que expira:{' '}
              <input
                type="text"
                name="expYear"
                maxLength={4}
                minLength={4}
                value={infos.expYear}
                onChange={handleChange}
              />{' '}
            </label>
            <label>
              Código de segurança(cvv):{' '}
              <input
                type="text"
                name="cvv"
                maxLength={3}
                minLength={3}
                value={infos.cvv}
                onChange={handleChange}
              />{' '}
            </label>
            <input type="submit" value="Encriptar" />
          </form>

          <div>
            <h2>Resultado</h2>
            <p className={styles.card}>{encryptedCard}</p>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home

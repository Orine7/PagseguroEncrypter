import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import { useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [infos, setInfos] = useState({
    publicKey: '',
    buyerName: '',
    expMonth: 0,
    expYear: 0,
    cvv: '',
    cardNumber: '',
  })

  const handleChange = (event: { target: { name: any; value: any } }) => {
    const name = event.target.name
    const value = event.target.value

    setInfos((values) => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //@ts-ignore
    const card = PagSeguro.encryptCard({
      publicKey: infos.publicKey,
      holder: infos.buyerName,
      number: infos.cardNumber,
      expMonth: infos.expMonth,
      expYear: infos.expYear,
      securityCode: infos.cvv,
    })

    event.preventDefault()

    alert(JSON.stringify(card))
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
                type="password"
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
                value={infos.cardNumber}
                onChange={handleChange}
              />{' '}
            </label>
            <label>
              Mês que expira:{' '}
              <input
                type="text"
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
                value={infos.expYear}
                onChange={handleChange}
              />{' '}
            </label>
            <label>
              Código de segurança(cvv):{' '}
              <input
                type="text"
                name="cvv"
                value={infos.cvv}
                onChange={handleChange}
              />{' '}
            </label>
            <input type="submit" value="Encriptar" />
          </form>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home

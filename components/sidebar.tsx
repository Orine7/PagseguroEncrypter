import Image from 'next/image'
import { FunctionComponent } from 'react'
import MyBtn, { button_style } from '../components/button'

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  setStdValues: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
}

const SideBar: FunctionComponent<Props> = ({
  isOpen,
  onClick,
  setStdValues,
}) => (
  <>
    <div
      className={`fixed z-10 h-full shadow-md bg-green-300 transition-all duration-450 ${
        isOpen ? 'w-[25vw]' : 'w-0'
      }`}
    >
      <button className={`absolute right-10 my-3`} onClick={onClick}>
        <Image src="/close.svg" alt="Close" width={20} height={20} />
      </button>

      <div
        className={`mx-6 my-10 p-6 bg-green-400 rounded-md ${
          isOpen ? '' : 'hidden'
        }`}
      >
        <p className={'text-2xl text-green-800'}>
          Esse projeto foi criado para facilitar a encriptação de cartões para
          teste usando o sistema da Pagseguro. <br />
          <br />
          Para usar o sistema, basta preencher os dados ao lado e clicar em
          encriptar. <br />
          Alternativamente, você pode clicar no botão abaixo para inserir os
          dados padrões utilizados em ambiente de Sandbox.
        </p>
        <a
          href="https://dev.pagseguro.uol.com.br/reference/charge-encrypted"
          className={`${button_style}`}
        >
          Docs do Pagseguro
        </a>
        <MyBtn onClick={setStdValues}>Padrão</MyBtn>
      </div>
    </div>
  </>
)

export default SideBar

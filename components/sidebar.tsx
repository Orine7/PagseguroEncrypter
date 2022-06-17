import Image from 'next/image'
import { FunctionComponent } from 'react'

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  isOpen: boolean
}

const SideBar: FunctionComponent<Props> = ({ isOpen, onClick }) => (
  <>
    <div
      className={`fixed z-10 shadow-md bg-green-400 transition-all duration-450 ${
        isOpen ? 'w-[25vw]' : 'w-0'
      }`}
    >
      <button className={`top-0 left-0 m-6`} onClick={onClick}>
        <Image src="/close.svg" alt="Close" width={20} height={20} />
      </button>
      <ul className="block">
        <li className=""></li>
      </ul>
    </div>
  </>
)

export default SideBar

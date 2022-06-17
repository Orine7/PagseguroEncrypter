import { FunctionComponent } from 'react'

type Props = {
  children: any
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  mx?: string
  my?: string
}

export const button_style = (
  mx: string | undefined,
  my: string | undefined,
) => `inline-flex items-center 
                px-6
                py-3
                ${mx ? `mx-${mx}` : 'mx-6'}
                ${my ? `my-${mx}` : 'my-4'}
                bg-green-300
                font-big
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-green-700 hover:shadow-lg
                active:bg-green-800 active:shadow-lg
                transition
                duration-150
                ease-in-out`
const MyBtn: FunctionComponent<Props> = ({ mx, my, onClick, children }) => (
  <>
    <button className={`${button_style(mx, my)}`} onClick={onClick}>
      {children}
    </button>
  </>
)

export default MyBtn

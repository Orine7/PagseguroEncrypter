import { FunctionComponent } from 'react'

type Props = {
  name: string
  placeholder: string
  value: string | number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  options: Record<string, any>
}

const FormField: FunctionComponent<Props> = ({
  name,
  placeholder,
  options,
  value,
  onChange,
}) => (
  <div className="form-group mb-6">
    <label className="form-label inline-block mb-2 text-gray-700">
      {placeholder}
    </label>
    <input
      className="form-control block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      id={`input_${name}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...options}
    />
  </div>
)

export default FormField

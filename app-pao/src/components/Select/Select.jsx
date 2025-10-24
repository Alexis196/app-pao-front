import Select from 'react-select'

const options = [
  { value: 'anillos', label: 'Anillos' },
  { value: 'aros', label: 'Aros' },
  { value: 'collares', label: 'Collares' },
]

const CustomSelect = () => {
  return (
    <Select
      options={options}
      placeholder="Seleccione una opción"
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: '20px',
          borderColor: '#f4b6c2',
          boxShadow: 'none',
          '&:hover': { borderColor: '#f28ba3' },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? '#f4b6c2' : '#fff',
          color: state.isFocused ? '#fff' : '#555',
        }),
      }}
    />
  )
}

export default CustomSelect
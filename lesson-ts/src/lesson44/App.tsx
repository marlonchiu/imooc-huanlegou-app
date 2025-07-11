const App = () => {
  const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log(event.target)
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  }

  return <input type="text" onClick={handleInputClick} onChange={handleInputChange} />
}

export default App

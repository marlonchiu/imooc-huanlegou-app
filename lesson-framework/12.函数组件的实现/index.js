function App(props) {
  return <h1>Hello, {props.name}</h1>
}

const element = <App name="Lee" />
const root = document.getElementById('root')

ReactDOM.render(element, root)

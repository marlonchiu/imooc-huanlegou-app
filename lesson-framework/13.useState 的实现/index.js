function Counter() {
  const [state, setState] = ReactDOM.useState(0)

  return <div onClick={() => setState((c) => c + 1)}>You clicked {state} times</div>
  // return (
  //   <div>
  //     <p>You clicked {state} times</p>
  //     <button onClick={() => setState((c) => c + 1)}>Click Me</button>
  //   </div>
  // )
}

const element = <Counter />
const root = document.getElementById('root')

ReactDOM.render(element, root)

let promiseStatus = 'pending'

const promise = new Promise(
  (resolver) => {
    setTimeout(() => {
      resolver()
      promiseStatus = 'resolved'
    }, 1000)
  },
  () => {}
)

function getData() {
  if (promiseStatus === 'pending') {
    throw promise
  } else {
    return 'hello world'
  }
}

function Todos() {
  const data = getData() // throw promise

  return (
    <div>
      <p>{data}</p>
    </div>
  )
}

export default Todos

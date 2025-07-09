function History({ history, onChange }) {
  console.log(history)
  const historyItems = history.map((item, index) => {
    return (
      <li key={index} className="history-item" onClick={() => onChange(index)}>
        this is step {index + 1}
      </li>
    )
  })

  return (
    <div>
      <h2 className="history-title">History</h2>
      <ul className="history-list">{historyItems}</ul>
    </div>
  )
}

export default History

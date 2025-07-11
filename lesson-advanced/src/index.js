import React, { Profiler } from 'react'
import ReactDOM from 'react-dom/client'
import App from './lesson40/App'

const root = ReactDOM.createRoot(document.getElementById('root'))

function renderCallback(id, phase, actualDuration, baseDuration, startTime, endTime) {
  console.log(id, phase, actualDuration, baseDuration, startTime, endTime)
}

root.render(
  <React.StrictMode>
    {/* <Profiler id="app" onRender={renderCallback}> */}
      <App />
    {/* </Profiler> */}
  </React.StrictMode>
)

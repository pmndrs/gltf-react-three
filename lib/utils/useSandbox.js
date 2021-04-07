import { useEffect, useState } from 'react'
import { sandboxCode } from './sandboxCode'

const useSandbox = (props) => {
  const [sandboxId, setSandboxId] = useState()
  const [error, setErr] = useState(false)
  useEffect(() => {
    fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(sandboxCode(props)),
    })
      .then((x) => x.json())
      .then((data) => setSandboxId(data.sandbox_id))
      .catch(() => setErr(true))
  }, [])

  return [sandboxId, error]
}

export default useSandbox

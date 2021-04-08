import { useEffect, useState } from 'react'
import { sandboxCode } from './sandboxCode'

const useSandbox = (props) => {
  const [sandboxId, setSandboxId] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setErr] = useState(false)
  const [sandboxCodeReturn, setSandboxCode] = useState()
  useEffect(() => {
    setSandboxCode()
    setSandboxCode(sandboxCode(props))
    setLoading(true)
    setErr(false)
    fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(sandboxCode),
    })
      .then((x) => x.json())
      .then((data) => setSandboxId(data.sandbox_id))
      .catch((e) => {
        console.log(e)
        setErr(true)
      })
      .finally(() => setLoading(false))
  }, [props.code])

  return [loading, sandboxId, error, sandboxCodeReturn]
}

export default useSandbox

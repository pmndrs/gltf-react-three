import { useEffect, useState } from 'react'
import { sandboxCode } from './sandboxCode'

const useSandbox = (props) => {
  const [sandboxId, setSandboxId] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setErr] = useState(false)
  const [sandboxCodeReturn, setSandboxCode] = useState()

  const createSandbox = async () => {
    setSandboxCode()
    setSandboxCode(sandboxCode(props))
    setLoading(true)
    setErr(false)
    try {
      const data = await fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(sandboxCode(props)),
      }).then((x) => x.json())

      if (data.sandbox_id) {
        setSandboxId(data.sandbox_id)
      } else {
        setErr(true)
      }
    } catch {
      setErr(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    createSandbox()
  }, [props.code])

  return [loading, sandboxId, error, sandboxCodeReturn]
}

export default useSandbox

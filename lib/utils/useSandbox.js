import { useEffect, useState } from 'react'
import { sandboxCode } from './sandboxCode'

const useSandbox = (props) => {
  const [sandboxId, setSandboxId] = useState()
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
  }, [])

  return sandboxId
}

export default useSandbox

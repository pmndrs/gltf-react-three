import { useEffect, useState } from 'react'
import Tippy from '@tippyjs/react'
import copy from 'clipboard-copy'
import 'tippy.js/dist/tippy.css'
import { sandboxCode } from '../lib/utils/sandboxCode'

const Nav = ({ code, types, setTypes, ...props }) => {
  const [copied, setCopied] = useState(false)
  const [sandboxId, setSandboxId] = useState()

  const copyToClipboard = async () => {
    try {
      await copy(code)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 200)
      // eslint-disable-next-line no-empty
    } catch {}
  }

  useEffect(() => {
    fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(sandboxCode({ ...props, code })),
    })
      .then((x) => x.json())
      .then((data) => setSandboxId(data.sandbox_id))
  }, [])

  return (
    <nav className="p-10 flex justify-end align-center">
      <ul className="flex justify-end align-center">
        <li className={`" hover:text-green-600 pr-5`}>
          <div className="flex items-center">
            <button
              onClick={() => setTypes((a) => !a)}
              type="button"
              className={`${
                types ? 'bg-green-600' : 'bg-gray-200'
              } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              aria-pressed="false"
              aria-labelledby="ts-types-label">
              <span className="sr-only">Typescript Types</span>
              <span
                aria-hidden="true"
                className={`${
                  types ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
            </button>
            <span className="ml-3" id="ts-types-label">
              <span className="text-sm font-medium text-gray-900">Show Typescript Types</span>
            </span>
          </div>
        </li>

        <li className={`${!copied ? 'text-gray-900' : 'text-green-600'} hover:text-green-600 pr-5`}>
          <Tippy content={copied ? 'Copied' : 'Copy to Clipboard'}>
            <button className="cursor-pointer" onClick={copyToClipboard}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </button>
          </Tippy>
        </li>
        {sandboxId ? (
          <li className={`text-gray-900 hover:text-green-600`}>
            <Tippy content={'Open in Codesandbox'}>
              <a className="cursor-pointer" href={`https://codesandbox.io/s/${sandboxId}`} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.5 6l10.455-6L22.41 6l.09 11.95L11.955 24 1.5 18zm2.088 2.481v4.757l3.345 1.86v3.516l3.972 2.296v-8.272zm16.739 0l-7.317 4.157v8.272l3.972-2.296V15.1l3.345-1.861V8.48zM4.634 6.601l7.303 4.144 7.32-4.18-3.871-2.197-3.41 1.945-3.43-1.968L4.633 6.6z" />
                </svg>
              </a>
            </Tippy>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}

export default Nav
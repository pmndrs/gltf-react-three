const Toggle = ({ children, onToggle, active }) => (
  <div className="flex items-center">
    <button
      onClick={() => onToggle(!active)}
      type="button"
      className={`${
        active ? 'bg-green-600' : 'bg-gray-200'
      } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      aria-pressed="false"
      aria-labelledby="ts-types-label">
      <span
        aria-hidden="true"
        className={`${
          active ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
    </button>
    <span className="ml-3" id="ts-types-label">
      <span className="text-sm font-medium text-gray-900">{children}</span>
    </span>
  </div>
)

export default Toggle

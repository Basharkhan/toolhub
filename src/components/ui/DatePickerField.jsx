import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function DatePickerField({
  id,
  label,
  selected,
  onChange,
  placeholder = 'Select a date',
  maxDate,
  error,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <DatePicker
        id={id}
        selected={selected}
        onChange={onChange}
        placeholderText={placeholder}
        maxDate={maxDate}
        dateFormat="MMMM d, yyyy"
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        yearDropdownItemNumber={100}
        scrollableYearDropdown
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 ${
          error
            ? 'border-red-500 focus:border-red-500'
            : 'border-slate-300 focus:border-slate-400'
        }`}
        wrapperClassName="date-picker-field w-full"
        calendarClassName="date-picker-calendar"
        popperClassName="date-picker-popper"
      />
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  )
}

export default DatePickerField

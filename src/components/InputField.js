const InputField = ({ refProp, type, placeholder, error }) => (
  <div className="my-3 mx-4">
    <input
      ref={refProp}
      type={type}
      placeholder={placeholder}
      autoComplete="current-password"
      className="p-3 rounded-md bg-white bg-opacity-20 w-full"
    />
    {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
  </div>
);

export default InputField;
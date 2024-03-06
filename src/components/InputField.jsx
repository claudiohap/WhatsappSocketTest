const InputField = ({ name, type, value, handleChange, disabled = false }) => {
  return (
    <fieldset className="flex flex-col shadow-md bg-slate-200 px-2 py-4 rounded">
      <label className="text-sm mb-2">{name}</label>
      <input
        type={type}
        className="settings-input"
        placeholder="Numero WAB"
        value={value}
        disabled={disabled}
        onChange={handleChange}
      />
    </fieldset>
  );
};

export default InputField;

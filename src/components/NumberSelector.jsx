import { socket } from "../socket";
import { useDataStore } from "../utils/dataStore";

const NumberSelector = () => {
  const [phoneNumbers, idLead, setIdLead, reload, getSocketAuth] = useDataStore(
    (state) => [
      state.phoneNumbers,
      state.idLead,
      state.setIdLead,
      state.reloadData,
      state.getSocketAuth,
    ],
  );
  const handleChange = (e) => {
    setIdLead(e.target.value);
  };

  const handleReload = () => {
    socket.disconnect();
    reload();
    socket.auth = getSocketAuth();
    socket.connect();
  };

  return (
    <div className="flex justify-center p-2 gap-2">
      <select
        className="border-2 border-slate-300 rounded px-2 py-1"
        value={idLead}
        onChange={handleChange}
      >
        <option value="0">Numero</option>
        {phoneNumbers.map((v) => (
          <option value={v.value} key={v.number}>
            {v.number}
          </option>
        ))}
      </select>
      <button className="bg-slate-300 rounded px-2 py-1" onClick={handleReload}>
        reload
      </button>
    </div>
  );
};

export default NumberSelector;

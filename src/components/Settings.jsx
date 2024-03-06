import { socket } from "../socket";
import { useDataStore } from "../utils/dataStore";
import InputField from "./InputField";

const Settings = () => {
  const [idLead, setIdLead] = useDataStore((state) => [
    state.idLead,
    state.setIdLead,
  ]);

  const [reloadData] = useDataStore((state) => [state.reloadData]);
  const [getSocketAuth] = useDataStore((state) => [state.getSocketAuth]);

  const handleRegistrar = () => {};

  const handleActualizar = () => {
    socket.disconnect();
    reloadData();
    socket.auth = getSocketAuth();
    socket.connect();
  };

  return (
    <div className="bg-slate-300 p-2 rounded flex flex-col gap-2 font-mono shadow">
      <InputField
        name={"Numero WAB"}
        type={"text"}
        disabled={true}
        value={"5215590354493"}
      />
      <InputField name={"Numero Lead"} type={"text"} />
      <InputField name={"Id Empresa"} type={"number"} value={1} disabled />
      <InputField name={"Id Vendedor"} type={"number"} value={1} disabled />
      <InputField
        name={"Id Lead"}
        type={"number"}
        value={idLead}
        handleChange={(e) => setIdLead(e.target.value)}
      />
      <div className="flex justify-evenly">
        <button className="normal-button" onClick={handleRegistrar}>
          Registrar
        </button>
        <button className="normal-button" onClick={handleActualizar}>
          Actualizar
        </button>
      </div>
    </div>
  );
};

export default Settings;

import { useState } from "react";
import { useDataStore } from "../utils/dataStore";
import axios from "axios";

const TemplateInput = () => {
  const templatesData = useDataStore((state) => state.templates);
  const [idEmpresa, idLead, idVendedor] = useDataStore((state) => [
    state.idEmpresa,
    state.idLead,
    state.idVendedor,
  ]);
  const reloadData = useDataStore((state) => state.reloadData);
  const [template, setTemplate] = useState("");
  const handleChange = (e) => {
    setTemplate(e.target.value);
  };

  const sendMessage = () => {
    axios
      .post(
        "http://localhost:3001/whatsapp/sendTemplateMessage",
        {
          templateID: template,
          id_empresa: idEmpresa,
          id_lead: idLead,
          id_vendedor: idVendedor,
        },
        {
          headers: {
            Authorization: import.meta.env.VITE_AUTH,
          },
        },
      )
      .then(() => {
        reloadData();
      });
  };

  return (
    <div className="flex gap-2 items-center">
      <p>Template:</p>
      <select
        className="px-2 py-1 text-slate-600 rounded"
        onChange={handleChange}
      >
        {templatesData.map((v) => (
          <option value={v.value} key={v.value}>
            {v.text}
          </option>
        ))}
      </select>
      <button className="normal-button" onClick={sendMessage}>
        Enviar
      </button>
    </div>
  );
};

export default TemplateInput;

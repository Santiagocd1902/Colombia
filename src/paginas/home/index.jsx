import React, { useEffect, useState } from "react";

function Home() {
  const [departamentos, setDepartamentos] = useState(null);
  const [capitales, setCapitales] = useState(null);
  const [modo, setModo] = useState("capitales");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const urlDpt =
      "https://gist.githubusercontent.com/diaztibata/fe3d238ee6b59ef71c8001654441a9f6/raw/4974a1b1cab3ac606dd96aa2d34d6e7c8e007daf/departamentosglobal.json";
    const urlCpt =
      "https://gist.githubusercontent.com/diaztibata/fe3d238ee6b59ef71c8001654441a9f6/raw/4974a1b1cab3ac606dd96aa2d34d6e7c8e007daf/capitalesglobal.json";

    const fetchJson = async (url, setter) => {
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Error al cargar JSON: " + resp.status);
        const json = await resp.json();
        setter(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchJson(urlDpt, setDepartamentos);
    fetchJson(urlCpt, setCapitales);
  }, []);

  // Determina cuál lista mostrar según el modo actual
  const dataActual =
    modo === "departamentos"
      ? departamentos?.data?.dep
      : capitales?.data?.cpt;

  // Filtra por búsqueda
  const dataFiltrada = dataActual?.filter((item) =>
    item.nm.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <>
      <div>
        <button onClick={() => setModo("departamentos")}>
          Mostrar Departamentos
        </button>
        <button onClick={() => setModo("capitales")}>Mostrar Capitales</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="lugar">
        {!dataActual ? (
          <p>Cargando {modo}...</p>
        ) : dataFiltrada.length > 0 ? (
          dataFiltrada.map((item) => (
            <p key={item.id}>
              {item.nm}
            </p>
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>

      <p>Nombre <span>número de votos</span></p>
      <div>
        <p>Candidatos:</p>
        <ul>
          <li>Candidato 1</li>
          <li>Candidato 2</li>
        </ul>
      </div>
    </>
  );
}

export default Home;

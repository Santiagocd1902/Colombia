import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Detalles() {
  const { depto, municipio } = useParams();
  const [municipioData, setMunicipioData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!depto || !municipio) return;

    const url = `https://gist.githubusercontent.com/diaztibata/fe3d238ee6b59ef71c8001654441a9f6/raw/225cef5e16b3997317e205a08a64985c9903f3c7/municipios-${encodeURIComponent(
      depto
    )}.json`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();

        const encontrado = data.mun.find((item) => item.id === municipio);

        if (!encontrado) {
          setError(`Municipio con id "${municipio}" no encontrado.`);
          setMunicipioData(null);
        } else {
          setMunicipioData(encontrado);
          setError(null);
        }
      } catch (err) {
        setError("Error al cargar el JSON: " + err.message);
        setMunicipioData(null);
      }
    };

    fetchData();
  }, [depto, municipio]);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!municipioData) return <p>Cargando municipio...</p>;

  return (
    <div>
      <h1>{municipioData.nm}</h1>
      <p><strong>ID:</strong> {municipioData.id}</p>
      <p><strong>TVN:</strong> {municipioData.tvn}</p>
      <p><strong>PVN:</strong> {municipioData.pvn}</p>
      <p><strong>VNM:</strong> {municipioData.vnm}</p>
      <hr />
      <p><Link to="/">⬅️ Volver al inicio</Link></p>
    </div>
  );
}

export default Detalles;

import { useEffect, useState } from "react";
import { getExhibitions } from "../services/api";

function Exhibiciones() {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    async function loadExhibitions() {
      try {
        const data = await getExhibitions();
        setExhibitions(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadExhibitions();
  }, []);

  return (
    <section>
      <h1>Exhibiciones</h1>

      {exhibitions.map((exhibition) => (
        <div key={exhibition.id}>
          <h2>{exhibition.title}</h2>

          {exhibition.year && <p>{exhibition.year}</p>}

          {exhibition.summary && <p>{exhibition.summary}</p>}
        </div>
      ))}
    </section>
  );
}

export default Exhibiciones;
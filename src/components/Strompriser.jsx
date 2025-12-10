import { useQuery } from "@tanstack/react-query";
import StrompriserDiagram from "./StrompriserDiagram";
import config from "../config";

const fetchStrompriser = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const url = `${config.urls.stromprisApi}/${year}/${month}-${day}_NO1.json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch prices');
  return response.json();
};

const Strompriser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['strompriser'],
    queryFn: fetchStrompriser,
    refetchInterval: 1000 * 60 * 60, // 1 hour
  });

  if (isLoading) return <div className="text-white">Laster strømpriser...</div>;
  if (error) return <div className="text-red-500">Feil ved henting av data</div>;

  return (
    <div className="w-full h-full">
      <StrompriserDiagram apiData={data} />
    </div>
  );
};

export default Strompriser;

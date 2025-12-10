import { useQuery } from "@tanstack/react-query";
import StrompriserDiagram from "./StrompriserDiagram";
import config from "../config";

const fetchStrompriser = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const zone = config.strom.zone;
  
  const url = `${config.urls.stromprisApi}/${year}/${month}-${day}_${zone}.json`;
  
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

  if (isLoading) return <div className="text-white text-center p-4">Laster strømpriser...</div>;
  if (error) return <div className="text-red-400 text-center p-4 font-bold">Kunne ikke hente strømpriser</div>;

  return (
    <div className="w-full h-full">
      <StrompriserDiagram apiData={data} />
    </div>
  );
};

export default Strompriser;
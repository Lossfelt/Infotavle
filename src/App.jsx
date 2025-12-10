import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Rutetider from "./components/Rutetider";
import config from "./config";

const queryClient = new QueryClient();

function App() {
  const handleRefresh = () => window.location.reload();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen grid grid-rows-[50vh_50vh] bg-black text-white overflow-hidden">
        {/* Weather Section */}
        <div className="relative w-full h-full overflow-hidden bg-black block">
           <button onClick={handleRefresh} className="w-full h-full cursor-pointer focus:outline-none block">
              <img 
                src={config.urls.yrMeteogram} 
                alt="Meteogram" 
                className="absolute -bottom-3 w-full h-[72vh] left-0 right-0"
              />
           </button>
        </div>

        {/* Info Board Section */}
        <div className="w-full h-full overflow-hidden">
           <Rutetider />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
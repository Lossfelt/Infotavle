import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Rutetider from "./components/Rutetider";
import Meteogram from "./components/Meteogram";

const queryClient = new QueryClient();

function App() {
  const handleRefresh = () => window.location.reload();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-screen h-screen grid grid-rows-[50vh_50vh] bg-black text-white overflow-hidden">
        {/* Weather Section */}
        <div className="relative w-full h-full overflow-hidden bg-black block">
           <Meteogram onClick={handleRefresh} />
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
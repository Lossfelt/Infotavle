import clsx from "clsx";

const PresenterAvganger = ({ avganger }) => {
  if (!avganger) return null;

  return (
    <div className="flex flex-col space-y-2 w-full h-full overflow-hidden items-center">
      {avganger.map((element, index) => (
        <div key={index} className={clsx(
            "text-2xl md:text-3xl lg:text-4xl font-bold truncate",
            element.Forsinket && "text-red-500",
            element.Kansellert && "opacity-50"
        )}>
           {element.Kansellert ? (
             <span className="line-through">{element.Avgang[0]}</span>
           ) : element.Forsinket ? (
             <div className="flex items-center space-x-2">
               <span className="line-through opacity-60 text-white">{element.Avgang[0]}</span>
               <span>{element.Avgang[1]}</span>
             </div>
           ) : (
             <span>{element.Avgang[0]}</span>
           )}
        </div>
      ))}
    </div>
  );
};

export default PresenterAvganger;

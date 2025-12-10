import clsx from "clsx";

const PresenterAvganger = ({ avganger }) => {
  if (!avganger) return null;

  return (
    <div className="flex flex-col space-y-2 w-full h-full overflow-hidden items-center">
      {avganger.map((element, index) => (
        <div key={`${element.lineId}-${index}`} className={clsx(
            "text-xl md:text-2xl lg:text-3xl font-bold truncate",
            element.forsinket && "text-red-500",
            element.kansellert && "opacity-50"
        )}>
           {element.kansellert ? (
             <span className="line-through">{element.avgang[0]}</span>
           ) : element.forsinket ? (
             <div className="flex items-center space-x-2">
               <span className="line-through opacity-60 text-white">{element.avgang[0]}</span>
               <span>{element.avgang[1]}</span>
             </div>
           ) : (
             <span>{element.avgang[0]}</span>
           )}
        </div>
      ))}
    </div>
  );
};

export default PresenterAvganger;
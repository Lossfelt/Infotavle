import clsx from "clsx";

const PresenterAvganger = ({ avganger }) => {
  if (!avganger) return null;

  return (
    <div className="flex h-full w-full flex-col gap-1 overflow-hidden items-center justify-start pt-1">
      {avganger.map((element, index) => (
        <div key={`${element.lineId}-${index}`} className={clsx(
            "w-full text-center text-lg md:text-xl lg:text-2xl font-bold truncate leading-none",
            element.forsinket && "text-red-500",
            element.kansellert && "opacity-50"
        )}>
           {element.kansellert ? (
             <span className="line-through">{element.avgang[0]}</span>
           ) : element.forsinket ? (
             <div className="flex items-center justify-center gap-2 leading-none">
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

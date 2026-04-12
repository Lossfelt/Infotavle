import clsx from "clsx";

const PresenterAvganger = ({ avganger }) => {
  if (!avganger) return null;

  const visibleRows = 5;
  const rows = [...avganger.slice(0, visibleRows), ...Array.from({ length: Math.max(0, visibleRows - avganger.length) }, () => null)];

  return (
    <div className="grid h-full w-full grid-rows-5 gap-1 overflow-hidden pt-1">
      {rows.map((element, index) => (
        <div
          key={element ? `${element.lineId}-${index}` : `empty-${index}`}
          className={clsx(
            "flex min-h-0 w-full items-center justify-center text-center text-lg md:text-xl lg:text-2xl font-bold leading-none",
            element?.forsinket && "text-red-500",
            element?.kansellert && "opacity-50"
          )}
        >
          {!element ? null : element.kansellert ? (
            <span className="truncate line-through">{element.avgang[0]}</span>
          ) : element.forsinket ? (
            <div className="flex min-h-0 items-center justify-center gap-2 leading-none">
              <span className="truncate line-through opacity-60 text-white">{element.avgang[0]}</span>
              <span className="truncate">{element.avgang[1]}</span>
            </div>
          ) : (
            <span className="truncate">{element.avgang[0]}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default PresenterAvganger;

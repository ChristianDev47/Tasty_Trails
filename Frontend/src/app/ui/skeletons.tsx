export function DishesSkeleton() {
  return (
    <div className="flex items-center flex-col justify-center bg-gray-200 rounded-xl h-full w-full animate-pulse">
      <div className="relative overflow-hidden rounded-t-xl w-full h-[260px]">
        <div className="absolute left-0 bottom-0 p-2 bg-gray-300 text-second rounded-r-lg w-16"></div>
      </div>
      <div className="w-full p-2 text-sm">
        <div className="h-14 flex justify-center items-center px-1">
          <div className="text-[13px] font-semibold bg-gray-300 w-3/4 h-4"></div>
        </div>
        <div className="flex justify-between items-center rounded-lg bg-gray-300 p-2 mb-2 ">
          <div className="flex flex-col items-center justify-center leading-none">
            <div className="text-[12px] font-bold bg-gray-300 w-8 h-4"></div>
          </div>
          <div className="flex flex-col items-center justify-center leading-none">
            <div className="text-[12px] font-bold bg-gray-300 w-8 h-4"></div>
          </div>
          <div className="flex flex-col items-center justify-center leading-none">
            <div className="text-[12px] font-bold bg-gray-300 w-8 h-4"></div>
          </div>
          <div className="flex flex-col items-center justify-center leading-none">
            <div className="text-[12px] font-bold bg-gray-300 w-8 h-4"></div>
          </div>
        </div>
      </div>
      <div className="flex text-white w-full justify-between items-center mt-4 bg-gray-300 px-2">
        <div className="inline-flex justify-start items-center mx-2 bg-gray-300 w-20 h-10"></div>
        <div className="flex justify-end items-center bg-gray-300 w-20 h-8 ">
          <div className="rounded-l-lg bg-gray-300 aspect-square px-2 text-lg"></div>
          <div className="px-4 bg-gray-300 h-full text-sm w-16 "></div>
          <div className="rounded-r-lg bg-gray-300 aspect-square px-2 text-lg"></div>
        </div>
      </div>
    </div>
  );
}

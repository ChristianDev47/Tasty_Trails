import NavAccount from "@/src/components/Account/NavAccount";
export default function Account({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-full min-h-[580px] flex justify-center items-center mt-[8rem] md:mt-[10rem] sm:mt-[10rem]">
      <div className="flex w-full h-[90%]  max-w-[1536px] justify-between md:flex-col sm:flex-col items-center  mx-[10rem] lg:mx-[2rem] md:mx-[2rem] md:mb-[8rem] sm:mx-[0] sm:mb-[8rem]">
        <NavAccount />
        <div className="bg-[#ffffff] w-full h-full flex items-start justify-start py-4 px-6 z-10">
          {children}
        </div>
      </div>
    </div>
  );
}

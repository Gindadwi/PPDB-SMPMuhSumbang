function card(props) {
  const { title, image, paragraf, onClick, onChange, cardClass } = props;

  return (
    <div className="bg-white w-[237px] lg:w-[346px] h-[300px] lg:h-[400px] border-2 border-gray-300 rounded-lg shadow-lg my-5 flex flex-col 2xl:h-[500px] 2xl:w-[400px]">
      <a href="#">
        <img src={image} alt="" className="rounded-t-lg bg-black w-full" />
      </a>

      <div className="px-3 pt-3 2xl:pt-6 flex flex-col justify-between flex-grow">
        <div>
          <h1 className="font-outfit font-medium text-black lg:text-[24px] text-[18px] 2xl:text-[34px]">
            {title}
          </h1>
          <p className="text-[12px] lg:text-[16px] font-medium font-poppins 2xl:text-[22px] 2xl:mt-3">
            {paragraf}
          </p>
        </div>

        {/* <div className="w-full flex items-center justify-center mt-auto pb-5">
          <button
            onClick={onClick}
            className="bg-slate-200 w-[198px] lg:w-[280px] h-[30px] lg:h-[48px] font-poppins text-[12px] font-medium rounded-lg border border-black shadow-sm mt-5"
          >
            Selengkapnya
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default card;

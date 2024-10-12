function card(props) {

    const { title, image, paragraf, onClick, onChange, cardClass } = props;

    return (
        <div className="bg-white w-[237px] lg:w-[346px] h-[340px] lg:h-[450px] border-2 border-gray-300 rounded-lg shadow-lg my-5  flex flex-col">

            <a href="#">
                <img src={image} alt="" className="rounded-t-lg bg-black w-full"/>
            </a>

            <div className="px-3 pt-3">
                <h1 className="font-outfit font-medium text-black lg:text-[24px] text-[18px] ">{title}</h1>
                <p className="text-[12px] lg:text-[16px] font-medium font-poppins">{paragraf}</p>
            </div>

            <div className="w-full flex flex-col items-center justify-center lg:mt-5">
                <button className="bg-slate-200 w-[198px] lg:w-[280px] h-[30px] lg:h-[48px] font-poppins text-[12px] font-medium rounded-lg border border-black shadow-sm mt-5  ">Selengkapnya</button>
            </div>

        </div>
    );
}

export default card;   
function Banners() {
  return (
    <div className="m-4  p-8 max-w-full overflow-hidden">
      <div className="flex flex-wrap mb-4 justify-center items-center">
        <img
          src="/banner1.png"
          alt="banner1"
          className="flex max-h-[auto] w-full pl-20 pr-20 mr-2 mb-2"
        />
      </div>

      <div className="flex flex-wrap mb-4 justify-center items-center pl-20 pr-20">
        <img
          src="/banner2.png"
          alt="banner2"
          className="flex max-h-[50rem] w-1/2 mb-2"
        />
        <img
          src="./banner3.png"
          alt=" banner3"
          className="flex max-h-[50rem] w-1/2 mb-2"
        />
      </div>
    </div>
  );
}

export default Banners;

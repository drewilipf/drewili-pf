function Banners() {
  return (
    <div className="m-4 shadow-xl p-8 max-w-full overflow-hidden">
  <div className="flex flex-wrap mb-4">
    <img
      src="/banner1.png"
      alt="banner1"
      className="flex max-h-40 w-auto mr-2 mb-2"
      style={{ width: '150', height: 'auto' }}
    />
    <img
      src="/banner2.png"
      alt="banner2"
      className="flex max-h-40 w-auto mb-2"
      style={{ width: '200px', height: 'auto' }}
    />
  </div>


      <div className="flex flex-wrap">
        <img
          src="/cat1.png"
          alt="cat1"
          className="max-h-30 w-auto mb-4 mr-2"
        />
        <img
          src="/cat2.png"
          alt="cat2"
          className="max-h-30 w-auto mb-4 mr-2"
        />
        <img
          src="/cat3.png"
          alt="cat3"
          className="max-h-30 w-auto mb-4 mr-2"
        />
        <img
          src="/cat4.png"
          alt="cat4"
          className="max-h-30 w-auto mb-4 mr-2"
        />
        <img
          src="/cat5.png"
          alt="cat5"
          className="max-h-30 w-auto mb-4 mr-2"
        />
        <img
          src="/cat6.png"
          alt="cat6"
          className="max-h-30 w-auto mb-4 mr-2"
        />
      </div>
    </div>
  );
}

export default Banners;
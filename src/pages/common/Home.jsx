import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
    {/* Section 1 */}
    <div
      className="hero h-90 md:h-80"
      style={{
        backgroundImage:
          "url(https://www.ulcdn.net/media/furniture-stores/patna/bailey-road/patna-bailey-road-773X413.jpg?1704365790)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Home Craft</h1>
          <p className="mb-5">
            Where comfort meets style. Discover beautifully crafted furniture
            and décor to make your home truly yours.
          </p>
          <Link to="/shope-all" className="btn btn-primary">
            Shope All
          </Link>
        </div>
      </div>
    </div>

    {/* section 2 */}
    <div className="flex flex-col">
    <div
      className="hero h-90 md:h-80 mt-4"
      style={{
        backgroundImage:
          "url(https://cdn.panhomestores.com/cdn-cgi/image/width=635,quality=60,%20format=auto,%20dpr=2/media/scandiweb/slider/b/e/bedroom_2.jpg)",
      }}
    >
      {/* <div className="hero-overlay bg-opacity-60"></div> */}
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-black border-4 border-l-0 border-r-0">Bed Room</h1>
          <Link to="/furniture/bed room" className="btn btn-primary">
            Shope Now
          </Link>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 text-center md:grid-cols-4 m-2 text-2xl font-semibold text-purple-100">
      <Link to="/furniture/bed room/beds" className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">Beds</Link>
      <Link to="/furniture/bed room/mattress" className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">Mattress</Link>
      <Link to="/furniture/bed room/wardrobe" className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">Wardrobe</Link>
      <Link to="/furniture/bed room/dressers" className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">Dressers</Link>
    </div>
    </div>

    {/* section 3 */}
    <div className="flex flex-col">
    <div
      className="hero h-90 md:h-80 mt-4"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/djthgkd4e/image/upload/v1738571720/sofa_dzyjvs.jpg)",
      }}
    >
      {/* <div className="hero-overlay bg-opacity-60"></div> */}
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-black border-4 border-l-0 border-r-0">Sofas</h1>
          <Link to="/shope-all" className="btn btn-primary">
            Shope Now
          </Link>
        </div>
      </div>
    </div>
    </div>

    {/* section 4 */}
    <div className="flex flex-col">
    <div
      className="hero h-90 md:h-80 mt-4"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/djthgkd4e/image/upload/v1738571807/living_mqfs3l.jpg)",
      }}
    >
      {/* <div className="hero-overlay bg-opacity-60"></div> */}
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-black border-4 border-l-0 border-r-0">Living Room</h1>
          <Link to="/shope-all" className="btn btn-primary">
            Shope Now
          </Link>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-5 m-2 text-2xl font-semibold text-purple-100">
      <button className="hidden bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl md:block">Lighting</button>
      <button className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">TV unit</button>
      <button className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">Sofas</button>
      <button className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">Coffee Table</button>
      <button className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">Floor covering</button>

    </div>
    </div>

    {/* section 6 */}
    <div className="flex flex-col">
    <div
      className="hero h-90 md:h-80 mt-4"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/djthgkd4e/image/upload/v1738572749/dining_kpgwyz.jpg)",
      }}
    >
      {/* <div className="hero-overlay bg-opacity-60"></div> */}
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-2xl font-bold text-black border-4 border-l-0 border-r-0 md:text-5xl">Dining & Kitchen</h1>
          <Link to="/shope-all" className="btn btn-primary">
            Shope Now
          </Link>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 m-2 text-2xl font-semibold text-purple-100">
      <button className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">Dining tables</button>
      <button className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">Dining sets</button>
      <button className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl">Dining Chairs</button>
    </div>
    </div>

    {/* section 6 */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div
      className="hero h-90 md:h-80 mt-4 rounded-full"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/djthgkd4e/image/upload/v1738571807/living_mqfs3l.jpg)",
      }}
    >
      <div className="hero-content text-neutral-content text-center">
        <div className="">
          <h1 className="mb-5 text-2xl font-bold text-black border-4 border-l-0 border-r-0 md:text-5xl">Utility & Storage</h1>
          <Link to="/shope-all" className="btn btn-primary">
            Shope Now
          </Link>
        </div>
      </div>
    </div>

    <div
      className="hero h-90 md:h-80 mt-4 rounded-full"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/djthgkd4e/image/upload/v1738218273/Kids_n_Teens_3_1_wbgh9e.avif)",
      }}
    >
      {/* <div className="hero-overlay bg-opacity-60"></div> */}
      <div className="hero-content text-neutral-content text-center">
        <div className="">
          <h1 className="mb-5 text-2xl font-bold text-black border-4 border-l-0 border-r-0 md:text-5xl">Kids & Teens</h1>
          <Link to="/shope-all" className="btn btn-primary">
            Shope Now
          </Link>
        </div>
      </div>
    </div>
    </div>

    {/* section 7 */}
    <div className="flex flex-col">
    
    </div>
    
    </>
    
  );
};

export default Home;

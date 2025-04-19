import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="pt-45">
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
            {/* <Link to="/shope-all" className="btn btn-primary">
            Shope All
          </Link> */}
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
              <h1 className="mb-5 text-5xl font-bold text-black border-4 border-l-0 border-r-0">
                Bed Room
              </h1>
              <Link to="/furniture/bed room" className="btn btn-primary">
                Shope Now
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 text-center md:grid-cols-4 m-2 text-2xl font-semibold text-purple-100">
          <Link
            to="/furniture/bed room/beds"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Beds
          </Link>
          <Link
            to="/furniture/bed room/mattress"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Mattress
          </Link>
          <Link
            to="/furniture/bed room/wardrobe"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Wardrobe
          </Link>
          <Link
            to="/furniture/bed room/dressers"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Dressers
          </Link>
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
              <h1 className="mb-5 text-5xl font-bold text-black border-4 border-l-0 border-r-0">
                Sofas
              </h1>
              <Link to="/furniture/sofas" className="btn btn-primary">
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
              <h1 className="mb-5 text-5xl font-bold text-black border-4 border-l-0 border-r-0">
                Living Room
              </h1>
              <Link to="/furniture/living room" className="btn btn-primary">
                Shope Now
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 m-2 text-2xl font-semibold text-purple-100 text-center">
          <Link
            to="/accessories/living room/lighting"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Lighting
          </Link>
          <Link
            to="/furniture/living room/tv unit"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            TV unit
          </Link>
          <Link
            to="/furniture/living room/sofas"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Sofas
          </Link>
          <Link
            to="/furniture/living room/coffee table"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Coffee Table
          </Link>
          <Link
            to="/accessories/living room/floor covering"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Floor covering
          </Link>
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
              <h1 className="mb-5 text-2xl font-bold text-black border-4 border-l-0 border-r-0 md:text-5xl">
                Dining & Kitchen
              </h1>
              <Link to="/furniture/dining room" className="btn btn-primary">
                Shope Now
              </Link>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 m-2 text-2xl font-semibold text-purple-100 text-center">
          <Link
            to="/furniture/dining room/ dining table"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Dining tables
          </Link>
          <Link
            to="/furniture/dining room/ dining sets"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Dining sets
          </Link>
          <Link
            to="/furniture/dining room/ dining chairs"
            className="bg-gradient-to-bl from-blue-500 to-cyan-950 m-2 p-2 rounded-2xl"
          >
            Dining Chairs
          </Link>
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
              <h1 className="mb-5 text-2xl font-bold text-black border-4 border-l-0 border-r-0 md:text-5xl">
                Utility & Storage
              </h1>
              <Link
                to="/accessories/utility and storage"
                className="btn btn-primary"
              >
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
              <h1 className="mb-5 text-2xl font-bold text-black border-4 border-l-0 border-r-0 md:text-5xl">
                Kids & Teens
              </h1>
              <Link to="/furniture/kids and teens" className="btn btn-primary">
                Shope Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* section 7 */}
      <div className="flex flex-col"></div>
    </div>
  );
};

export default Home;

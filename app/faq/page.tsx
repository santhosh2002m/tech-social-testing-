import RightSide from "@/components/home/RightSide";
import HomeLeft from "@/components/menu/HomeLeft";

export default function page() {
  return (
    <main className="main-content">
      <div className="container sidebar-toggler">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-4 col-6 cus-z2">
            {/* Home Left */}
            <HomeLeft clss="d-lg-none" />
          </div>
          <div className="col-xxl-6 col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
            hello
          </div>
          <div className="col-xxl-3 col-xl-4 col-lg-4 col-6 mt-5 mt-xl-0">
            {/* Home Right */}
            <RightSide />
          </div>
        </div>
      </div>
    </main>
  );
}

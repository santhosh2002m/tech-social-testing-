import HomeLeft from "@/components/menu/HomeLeft";
import Subscription from "../../components/subscription/Subscription"; // Adjust the path as needed

export default function subscription() {
  return (
    <main className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-4">
            {/* Home Left */}
            <HomeLeft clss="d-lg-none" />
          </div>
          <div className="col-xl-9 col-lg-8 cus-mar setting-row">
            <Subscription />
          </div>
        </div>
      </div>
    </main>
  );
}

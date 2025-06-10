import HomeLeft from "@/components/menu/HomeLeft";
// import Subscription from "../../components/subscription/Subscription"; // Adjust the path as needed
import ContactForm from "@/components/ContactForm/ContactForm";

export default function subscription() {
  return (
    <main className="main-content">
      <div className="container">
        <div className="row">
          <div className="col-xxl-3 col-xl-3 col-lg-4">
            {/* Home Left */}
            <HomeLeft clss="d-lg-none" />
          </div>
          <div className=" col-xl-5 col-lg-8 mt-0 mt-lg-10 mt-xl-0 d-flex flex-column gap-7 cus-z">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}

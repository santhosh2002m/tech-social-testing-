// SingleContact.tsx
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ContactAction from "../ui/ContactAction";

interface ContactProps {
  id: number;
  name: string;
  avt: StaticImageData;
}

interface SingleContactProps {
  data: ContactProps;
  sectionType: "followers" | "followings";
}

const SingleContact = ({ data, sectionType }: SingleContactProps) => {
  const { avt, id, name } = data;

  return (
    <>
      <div className="avatar-item d-flex gap-3 align-items-center">
        <div className="avatar-item">
          <Image className="avatar-img max-un" src={avt} alt="avatar" />
        </div>
        <div className="info-area">
          <h6 className="m-0">
            <Link href="/public-profile/post" className="mdtxt">
              {name}
            </Link>
          </h6>
        </div>
      </div>
      <ContactAction sectionType={sectionType} />
    </>
  );
};

export default SingleContact;

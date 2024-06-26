import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
  return (
    <div className="w-full px-10 py-8 justify-between items-center inline-flex">
      <div className="text-black text-4xl font-bold font-['NanumMyeongjo']">
        draft
      </div>
      <FontAwesomeIcon icon={faBars} size="2xl" />
    </div>
  );
}

import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FullScreenSearch({ onClose }: { onClose: () => void }) {
  return (
    <div className="search-area flex flex-row justify-start items-center gap-2 opened ">
      <div className="search-box flex items-center relative p-1 pl-3 pr-2 rounded-full">
        <input
          placeholder="무엇을 검색해볼까요.."
          className="search-field outline-none w-0"
          name="query"
        ></input>
        <button type="submit" className="search-icon">
          <FontAwesomeIcon icon={faSearch} size="lg" />
        </button>
      </div>
      <FontAwesomeIcon
        className="search-close"
        icon={faClose}
        size="xl"
        onClick={onClose}
      />
    </div>
  );
}

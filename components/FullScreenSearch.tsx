import { faSearch, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FullScreenSearch({
  onClose,
  keyword,
  onChangeKeyword,
  onSearch,
}: {
  onClose: () => void;
  keyword: string;
  onChangeKeyword: (keyword: string) => void;
  onSearch: () => void;
}) {
  return (
    <div
      className={`search-area opened flex flex-row justify-start items-center gap-2 `}
    >
      <div className="search-box flex items-center p-1 pl-3 pr-2 rounded-full">
        <input
          placeholder="무엇을 검색해볼까요.."
          className="search-field outline-none"
          name="query"
          value={keyword}
          onChange={({ target }) => onChangeKeyword(target.value)}
        ></input>
        <FontAwesomeIcon icon={faSearch} size="lg" onClick={onSearch} />
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 border border-b-gray-300">
      <h1 className="font-extrabold text-3xl">Wh@t !s development?</h1>
      <div className="flex gap-4 items-center">
        <form action={"/search"}>
          <div className="search-box flex items-center relative p-1 pl-3 pr-2 border border-solid border-gray-300 rounded-full">
            <input
              placeholder="무엇을 검색해볼까요.."
              className="search-field outline-none"
              name="query"
            ></input>
            <button type="submit" className="search-icon">
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </button>
          </div>
        </form>
        <FontAwesomeIcon icon={faBars} size="xl" />
      </div>
    </div>
  );
}

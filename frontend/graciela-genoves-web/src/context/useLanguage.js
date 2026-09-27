import { useContext } from "react";
import LanguageContext from "./LanguageContext";

function useLanguage() {
  return useContext(LanguageContext);
}

export default useLanguage;
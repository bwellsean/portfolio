import { useEffect } from "react";

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - Sean Blackwell`;
  }, [title]);
};

export default useDocumentTitle;

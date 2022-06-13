export interface WikipediaSearchResult {
  id: number;
  key: string; // articles url key
  title: string; // the article's title
  excerpt: string; // brief description of the article
  matched_title: string | null;
  description: string; // what type of entry this is
  thumbnail: {
    mimetype: string;
    size: number | null;
    width: number;
    height: number;
    duration: number | null;
    url: string;
  };
}

export interface WikipediaPageSummary {
  type: string; // e.g. "standard",
  title: string; // e.g. "Asimina triloba",
  displaytitle: string; // e.g "<i>Asimina triloba</i>",
  namespace: {
    id: number; // e.g 0
    text: string; // e.g ""
  };
  wikibase_item: string; // e.g "Q948827",
  titles: {
    canonical: string; // e.g "Asimina_triloba",
    normalized: string; // e.g "Asimina triloba",
    display: string; // e.g "<i>Asimina triloba</i>"
  };
  pageid: number; // e.g 4270664
  thumbnail: {
    source: string; // e.g "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Asimina_triloba3.jpg/320px-Asimina_triloba3.jpg",
    width: number; // e.g 320
    height: number; // e.g 210
  };
  originalimage: {
    source: string; // e.g "https://upload.wikimedia.org/wikipedia/commons/1/15/Asimina_triloba3.jpg",
    width: number; // e.g 2700
    height: number; // e.g 1776
  };
  lang: string; // e.g "en",
  dir: string; // e.g "ltr",
  revision: string; // e.g "1086681140",
  tid: string; // e.g "ef310780-e58d-11ec-9ac2-d597aca4945a",
  timestamp: string; // e.g "2022-05-07T17:53:29Z",
  description: string; // e.g "Species of tree",
  description_source: string; // e.g "local",
  content_urls: {
    desktop: {
      page: string; // e.g "https://en.wikipedia.org/wiki/Asimina_triloba",
      revisions: string; // e.g "https://en.wikipedia.org/wiki/Asimina_triloba?action=history",
      edit: string; // e.g "https://en.wikipedia.org/wiki/Asimina_triloba?action=edit",
      talk: string; // e.g  "https://en.wikipedia.org/wiki/Talk:Asimina_triloba"
    };
    mobile: {
      page: string; // e.g  "https://en.m.wikipedia.org/wiki/Asimina_triloba",
      revisions: string; // e.g "https://en.m.wikipedia.org/wiki/Special:History/Asimina_triloba",
      edit: string; // e.g "https://en.m.wikipedia.org/wiki/Asimina_triloba?action=edit",
      talk: string; // e.g "https://en.m.wikipedia.org/wiki/Talk:Asimina_triloba"
    };
  };
  extract: string; // e.g "Asimina triloba, the American papaw,...",
  extract_html: string; // e.g "<p><i><b>Asimina triloba</b></i>, the <b>American papaw</b>, ..."
}

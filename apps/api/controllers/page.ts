import {
  Request,
  Response,
  Status
} from 'https://deno.land/x/oak@v10.6.0/mod.ts';
import { supabase } from '../lib/supabase.ts';
import { validateDomain } from '../utils/common.ts';
import { Plant } from '../models/plant.ts';
import {
  WikipediaSearchResult,
  WikipediaPageSummary
} from '../models/wikipedia.ts';
import errors from '../constants/errors.ts';
import { stringSimilarity } from '../utils/common.ts';

const plants_table = 'plants';

/**
 * Create a page on the wiki site from Wikipedia meta data
 * @param context
 */
export const createPage = async (context: {
  request: Request;
  response: Response;
}) => {
  const { request, response } = context;
  // if coming from the main website
  if (!validateDomain(request)) {
    response.status = Status.Forbidden;
    response.body = errors.Forbidden;
    return;
  }
  // no name in the request body
  let { common_name, botanical_name } = await request.body({ type: 'json' })
    .value;
  // trim the incoming values
  common_name = common_name.trim();
  botanical_name = botanical_name.trim();
  if (!common_name || !botanical_name) {
    response.status = Status.BadRequest;
    response.body = errors.BadRequest;
    return;
  }
  // get the data search item from wikipedia
  const searchResponse = await fetch(
    `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${botanical_name}&limit=1`
  );
  const searchData = (await searchResponse.json()) as {
    pages: Array<WikipediaSearchResult>;
  };
  // no wikipedia search result
  if (!searchData || searchData.pages.length < 1) {
    response.status = Status.NotFound;
    response.body = { message: 'Could not find this article on Wikipedia' };
    return;
  }
  const searchResult = searchData.pages[0];
  // check for existing data with the given name
  try {
    const { data } = await supabase
      .from<Plant>(plants_table)
      .select('botanical_name')
      .or(
        `common_name.eq.${searchResult.title},botanical_name.eq.${searchResult.title}`
      )
      .single();
    // return an error if it exists
    if (data) {
      response.status = Status.Conflict;
      response.body = { message: 'This plant already exists in the wiki' };
      return;
    }
  } catch (e) {
    // errors here are ok
  }
  // get the article for summary
  const summaryResponse = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${searchResult.title}`
  );
  const summaryData = (await summaryResponse.json()) as WikipediaPageSummary;
  // NOTE: Use this link for raw HTML, can be used later
  // https://en.wikipedia.org/api/rest_v1/page/html/Asimina triloba
  // create a new plant and return the data
  try {
    //data to be added to the table
    const insertData: Partial<Plant> = {
      common_name,
      botanical_name,
      description: summaryData.extract,
      image_url: summaryData.thumbnail.source
    };
    // use the wikipedia title for one of the names
    const compareCommonName = stringSimilarity(searchResult.title, common_name);
    const compareBotanicalName = stringSimilarity(
      searchResult.title,
      botanical_name
    );
    // set the common name if the Wikipedia title is more similar
    if (compareCommonName >= compareBotanicalName)
      insertData.common_name = searchResult.title;
    // set the botanical name if the Wikipedia title is more similar
    else insertData.botanical_name = searchResult.title;

    const { data, error } = await supabase
      .from<Plant>(plants_table)
      .insert(insertData)
      .single();
    if (error) {
      response.status = Status.InternalServerError;
      response.body = errors.InternalServerError;
    }
    response.body = data;
  } catch (e) {
    response.status = Status.InternalServerError;
    response.body = errors.InternalServerError;
  }
};

/**
 * Update an existing page on the website
 * @param context
 */
export const updatePage = async ({
  params,
  request,
  response
}: {
  params: { revision_id: string };
  request: Request;
  response: Response;
}) => {
  // if coming from the main website
  if (!validateDomain(request)) {
    response.status = Status.Forbidden;
    response.body = errors.Forbidden;
    return;
  }
  // no name in the request body
  const { name } = await request.body({ type: 'json' }).value;
  if (!name) {
    response.status = Status.BadRequest;
    response.body = errors.BadRequest;
    return;
  }

  // check for existing data with the given name
  try {
    const { data } = await supabase
      .from<Plant>(plants_table)
      .select('botanical_name')
      .eq('botanical_name', name)
      .single();
    // return an error if it exists
    if (data) {
      response.status = Status.Conflict;
      response.body = 'This plant already exists in the wiki';
      return;
    }
  } catch (e) {
    console.error(e);
  }
};

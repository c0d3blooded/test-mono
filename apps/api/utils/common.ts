import { Request } from 'https://deno.land/x/oak@v10.6.0/mod.ts';

/**
 * Validates that a request came from the website
 * @param context
 * @returns {boolean} if the request is valid
 */
export const validateDomain = (request: Partial<Request>) => {
  const urlExceptions = Deno.env.get('IGNORE_KEY_CHECK')?.split(',');
  // if the url is not an exception
  return urlExceptions?.includes(request.headers?.get('origin') ?? '');
};

/* For calculating edit distance */
function editDistance(s1: string, s2: string) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  const costs = [];
  for (let i = 0; i <= s1.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= s2.length; j++) {
      if (i == 0) costs[j] = j;
      else {
        if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0) costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

/**
 * Calculates the similarity between 2 strings
 * https://stackoverflow.com/questions/10473745/compare-strings-javascript-return-of-likely
 * @param s1
 * @param s2
 * @returns
 */
export const stringSimilarity = (s1: string, s2: string) => {
  let longer = s1;
  let shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  const longerLength = longer.length;
  if (longerLength == 0) return 1.0;
  return (
    (longerLength - editDistance(longer, shorter)) /
    parseFloat(longerLength.toString())
  );
};

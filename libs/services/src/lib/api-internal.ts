// the private Treelof API client
import axios from 'axios';

// set axios defaults
const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_PAGE}/internal`
});

export default client;

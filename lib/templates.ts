import * as Path from 'path';
import { Resource } from './resources';

const templatesDir = Path.join(__dirname, '_templates');

export default {
  hook: new Resource('hook', templatesDir), 
  hookmanFile: new Resource('hookman.json', templatesDir), 
}
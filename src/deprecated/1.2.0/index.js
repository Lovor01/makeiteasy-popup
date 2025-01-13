import block from './block-settings.json';
import save from './save.jsx';
import migrate from './migrate.js';

block.save = save;
block.migrate = migrate;

export default block;

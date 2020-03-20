import produce, { setAutoFreeze } from 'immer';

/**
 * Add custom export to transparently setAutoFreeze
 */

// Prevent immer.produce from freezing returned objects
// Otherwise the mutating code will fail
setAutoFreeze(false);

export default produce;

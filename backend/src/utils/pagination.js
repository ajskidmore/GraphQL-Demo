/**
 * Helper function to implement cursor-based pagination
 * @param {Array} data - The data array to paginate
 * @param {number} first - Number of items to return (limit)
 * @param {string} after - Cursor to start after
 * @returns {Object} - Contains edges, pageInfo, and totalCount
 */
const paginateResults = ({ data, first = 10, after }) => {
  if (!data) return null;
  
  const edges = data.map((item, index) => ({
    cursor: Buffer.from(`${index}`).toString('base64'),
    node: item
  }));
  
  // If "after" is provided, slice the data
  if (after) {
    const afterIndex = edges.findIndex(
      edge => edge.cursor === after
    );
    
    if (afterIndex >= 0) {
      edges = edges.slice(afterIndex + 1);
    }
  }
  
  // Limit the data
  edges = edges.slice(0, first);
  
  // Determine if there are more pages
  const hasNextPage = data.length > (after ? 
    edges.length + edges.findIndex(edge => edge.cursor === after) + 1 : 
    edges.length);
  
  return {
    edges,
    pageInfo: {
      hasNextPage,
      endCursor: edges.length > 0 ? edges[edges.length - 1].cursor : null
    },
    totalCount: data.length
  };
};

module.exports = { paginateResults };
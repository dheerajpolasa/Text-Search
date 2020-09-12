const development = {
  // If using local db, then only db name is required
  local_db: 'text_search_db',
  // If using mongo atlas, below are required properties
  atlas_db_username: '<Enter your DB Username>',
  atlas_db_password: '<Enter your DB Password>',
  atlas_db: '<Enter your DB Name>',
  atlas_db_cluster: '<Enter your DB Cluster>',
};

module.exports = development;

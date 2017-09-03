export default {
  // Holds full currently cached storylist
  stories: [],
  // Holds ordered lists from HN by ID only
  storyLists: {
    top: [],
    new: [],
    best: []
  },
  ajaxInfo: {
    ajaxInProgress: false,
    error: ''
  }
};
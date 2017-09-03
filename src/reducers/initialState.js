export default {
  // Holds full currently cached storylist
  stories: [],
  // Holds ordered lists from HN by ID only
  storyLists: {
    top: {list: [], amount: 20},
    new: {list: [], amount: 20},
    best: {list: [], amount: 20}
  },
  ajaxInfo: {
    ajaxInProgress: false,
    error: ''
  }
};
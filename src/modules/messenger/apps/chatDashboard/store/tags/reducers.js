import actions from './actions';
const tagList = [
  {
    authorId: "a01",
    authorName: "Adnan",
    authorImg: "",
    tags: [
      {
        id: "t01",
        label: "Food"
      },
      {
        id: "t02",
        label: "Travel"
      },
      {
        id: "t03",
        label: "Playing"
      },
      {
        id: "t04",
        label: "Swimming"
      }
    ]
  },
  {
    authorId: "a02",
    authorName: "Adnan",
    authorImg: "",
    tags: [
      {
        id: "t01",
        label: "Food"
      },
      {
        id: "t02",
        label: "Travel"
      },
      {
        id: "t03",
        label: "Playing"
      },
      {
        id: "t04",
        label: "Swimming"
      }
    ]
  },
  {
    authorId: "a03",
    authorName: "Adnan",
    authorImg: "",
    tags: [
      {
        id: "t01",
        label: "Food"
      },
      {
        id: "t02",
        label: "Travel"
      },
      {
        id: "t03",
        label: "Playing"
      },
      {
        id: "t04",
        label: "Swimming"
      }
    ]
  },
  {
    authorId: "a04",
    authorName: "Adnan",
    authorImg: "",
    tags: [
      {
        label: "Food"
      },
      {
        label: "Travel"
      },
      {
        label: "Playing"
      },
      {
        label: "Swimming"
      }
    ]
  }
]

const initialState = {
  allTags: tagList,
  activeAuthorId: "a01",
  activeTagId: "t01",
  tagsModal: false,
  tagFormModal: false,
  deleteConversation: false,
  modalOverlay: false,
  loading: false,
  error: null,
};

const {
  TAG_LIST_MODAL_UPDATE_BEGIN,
  TAG_LIST_MODAL_UPDATE_SUCCESS,
  TAG_LIST_MODAL_UPDATE_ERR,

  TAG_FORM_MODAL_UPDATE_BEGIN,
  TAG_FORM_MODAL_UPDATE_SUCCESS,
  TAG_FORM_MODAL_UPDATE_ERR,

  DELETE_CONFIRMATION_MODAL_BEGIN,
  DELETE_CONFIRMATION_MODAL_SUCCESS,
  DELETE_CONFIRMATION_MODAL_ERR
} = actions;

const TagReducer = (state = initialState, action) => {
  const { type, status, err } = action;
  switch (type) {
    case TAG_LIST_MODAL_UPDATE_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case TAG_LIST_MODAL_UPDATE_SUCCESS:
      return {
        ...state,
        tagsModal: status,
        modalOverlay: status,
        sLoading: false,
      };
    case TAG_LIST_MODAL_UPDATE_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    case TAG_FORM_MODAL_UPDATE_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case TAG_FORM_MODAL_UPDATE_SUCCESS:
      return {
        ...state,
        tagsModal: !status,
        tagFormModal: status,
        sLoading: false,
      };
    case TAG_FORM_MODAL_UPDATE_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    case DELETE_CONFIRMATION_MODAL_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case DELETE_CONFIRMATION_MODAL_SUCCESS:
      return {
        ...state,
        deleteConversation: status,
        modalOverlay: status,
        sLoading: false,
      };
    case DELETE_CONFIRMATION_MODAL_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    default:
      return state;
  }
};

export default TagReducer;
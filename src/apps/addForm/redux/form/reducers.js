import actions from './actions';
// import toData from '../../demoData/note.json';
const formData ={
    "form_id": "1",
    "name": "",
    "template": "Large",
    "all_page_visibility": true,
    "custom_visible_page": null,
    "acccount_creation": true,
    "account_fields": ['name','email','passowrd'],
    "show_chat_onload": true,
    "chat_video_img": "",
    "greet_message": "Welcome to Directorist, leave your questions below",
    "description_visibility": true,
    "description": "Welcome to Directorist, leave your questions below",
    "reply_type": ["video","screen record", "voice", "text"],
    "footer_visibility": true,
    "footer_message": "You can practice before sending",
    "font": "Roboto",
    "font_size": "Medium",
    "font_color": "#ffffff",
    "button_color": "#000000",
    "Button_border_radius": "15",
    "info_collection_visibility": true,
    "collect_info": ['name','email','phone'],
    "thank_page_title": "Thank You",
    "thank_page_description_Visibility": true, 
    "thank_page_description": "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface",
    "thank_page_button_visibility": true,
    "thank_page_button_text": "Try for Free",
    "thank_page_button_url": "www.demo.com",
    "thank_page_background": "#000000",
    "thank_page_title_font_size": "Medium",
    "thank_page_font_color": "#ffffff",
    "thank_page_button_color": "#ffffff",
    "thank_page_button_text_color": "#ffffff",
    "thank_page_button_radius": "15",
}

const initialState = {
  data: formData,
  loading: false,
  error: null,
};

const {
  FORM_ADD_BEGIN,
  FORM_ADD_SUCCESS,
  FORM_ADD_ERR,
} = actions;

const FormReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case FORM_ADD_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case FORM_ADD_SUCCESS:
      return {
        ...state,
        data,
        sLoading: false,
      };
    case FORM_ADD_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    default:
      return state;
  }
};

export default FormReducer;

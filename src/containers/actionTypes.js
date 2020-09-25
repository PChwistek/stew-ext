const TABS_SNAP = 'TABS_SNAPSHOT'
const TABS_SETSNAP = 'TABS_SETSNAPSHOT'
const TABS_SETSNAP_EXISTING = 'TABS_SETSNAP_EXISTING'
const TABS_REMOVETAB = 'TABS_REMOVETAB'
const TABS_REMOVEWINDOW = 'TABS_REMOVEWINDOW'
const TABS_SETRECIPENAME = 'TABS_SETRECIPENAME'
const TABS_SETRECIPETAG = 'TABS_SETRECIPETAG'
const TABS_ADDRECIPETAG = 'TABS_ADDRECIPETAG'
const TABS_REMOVERECIPETAG = 'TABS_REMOVERECIPETAG'
const TABS_SETRECIPEPUBLIC = 'TABS_SETRECIPEPUBLIC'
const TABS_CLEARFIELDS = 'TABS_CLEARFIELDS'
const TABS_SAVERECIPE = 'TABS_SAVERECIPE'
const TABS_LAUNCHRECIPE = 'TABS_LAUNCHRECIPE'
const TABS_LAUNCHRECIPE_PENDING = 'TABS_LAUNCHRECIPE_PENDING'
const TABS_LAUNCHRECIPE_SUCCESS = 'TABS_LAUNCHRECIPE_SUCCESS'
const TABS_LAUNCHRECIPE_FAILED = 'TABS_LAUNCH_RECIPE_FAILED'
const TABS_SAVERECIPE_SUCCESS = 'TABS_SAVERECIPE_SUCCESS'
const TABS_SAVERECIPE_PENDING = 'TABS_SAVERECIPE_PENDING'
const TABS_SAVERECIPE_FAILED = 'TABS_SAVERECIPE_FAILED'
const TABS_SETRECIPEFORM = 'TABS_SETRECIPEFORM'
const TABS_SETCURRENTWINDOW = 'TABS_SETCURRENTWINDOW'
const TABS_SETCURRENTTAB = 'TABS_SETCURRENTTAB'
const TABS_QUICKADD = 'TABS_QUICKADD'
const TABS_QUICKADD_ALIAS = 'TABS_QUICKADD_ALIAS'
const TABS_SET_ISNEW = 'TABS_SET_ISNEW'
const TABS_DELETERECIPE = 'TABS_DELETERECIPE'
const TABS_DELETERECIPE_PENDING = 'TABS_DELETERECIPE_PENDING'
const TABS_DELETERECIPE_SUCCESS = 'TABS_DELETERECIPE_SUCCESS'
const TABS_DELETERECIPE_FAILED = 'TABS_DELETERECIPE_FAILED'
const TABS_RESET = 'TABS_RESET'
const TABS_MERGE_SESSION = 'TABS_MERGE_SESSION'
const TABS_MERGE_SESSION_ALIAS = 'TABS_MERGE_SESSION_ALIAS'
const TABS_MERGE_POPUP_CLOSED = 'TABS_MERGE_POPUP_CLOSED'
const TABS_MOVE_TAB = 'TABS_MOVE_TAB'
const TABS_MOVE_TAB_ALIAS = 'TABS_MOVE_TAB_ALIAS'
const TABS_UPDATE_MOVE_TAB = 'TABS_UPDATE_MOVE_TAB'
const TABS_UPDATE_MOVE_TAB_ALIAS = 'TABS_UPDATE_MOVE_TAB_ALIAS'
const TABS_SETRECIPE_PERMISSIONS = 'TABS_SETRECIPE_PERMISSIONS'
const TABS_SETRECIPE_PERMISSIONS_ALIAS = 'TABS_SETRECIPE_PERMISSIONS_ALIAS'

const POPUP_TOGGLEEDITING = 'POPUP_TOGGLEEDITING'
const POPUP_TOGGLEEDITING_ALIAS = 'POPUP_TOGGLEEDITING_ALIAS'
const POPUP_TOGGLE_SLIDE = 'POPUP_TOGGLE_SLIDE'
const POPUP_SYNCRECIPES = 'POPUP_SYNC_RECIPES'
const POPUP_SYNCRECIPES_PENDING = 'POPUP_SYNC_RECIPES_PENDING'
const POPUP_SYNCRECIPES_SUCCESS = 'POPUP_SYNC_RECIPES_SUCCESS'
const POPUP_SYNCRECIPES_FAILED = 'POPUP_SYNC_RECIPES_FAILED'
const POPUP_OPENED = 'POPUP_OPENED'
const POPUP_SET_WINDOWID = 'POPUP_SET_WINDOWID'
const POPUP_HELP_INSTALLED = 'POPUP_HELP_INSTALLED_ALIAS'
const POPUP_SET_HELP_INSTALLED = 'POPUP_SET_HELP_INSTALLED_ALIAS'

const SEARCH_SETSEARCHTERMS_POPUP = 'SEARCH_SETSEARCHTERMS_POPUP'
const SEARCH_SETSEARCHTERMS_ALIAS = 'SEARCH_SETSEARCHTERMS_ALIAS'
const SEARCH_SETDROPDOWNOPEN = 'SEARCH_SETDROPDOWNOPEN'
const SEARCH_SETSORTBY = 'SEARCH_SETSORTBY'
const SEARCH_SETSORTBY_ALIAS = 'SEARCH_SETSORTBY_ALIAS'
const SEARCH_PREVIOUSROW = 'SEARCH_PREVIOUSROW'
const SEARCH_NEXTROW = 'SEARCH_NEXTROW'
const SEARCH_SETROW = 'SEARCH_SETROW'
const SEARCH_SETROW_ALIAS = 'SEARCH_SETROW_ALIAS'
const SEARCH_SETRESULTS_PENDING = 'SEARCH_SETRESULTS_PENDING'
const SEARCH_SETRESULTS_SUCCESS = 'SEARCH_SETRESULTS_SUCCESS'
const SEARCH_SETRESULTS_FAILED = 'SEARCH_SETRESULTS_SUCCESS'
const SEARCH_GET_INITIAL_RESULTS = 'SEARCH_GET_INITIAL_RESULTS'
const SEARCH_GET_INITIAL_RESULTS_FAILED = 'SEARCH_GET_INITIAL_RESULTS_FAILED'
const SEARCH_GET_INITIAL_RESULTS_SUCCESS = 'SEARCH_GET_INITIAL_RESULTS_SUCCESS'
const SEARCH_GET_INITIAL_RESULTS_PENDING = 'SEARCH_GET_INITIAL_RESULTS_PENDING'
const SEARCH_SETFAVORITE = 'SEARCH_SET_FAVORITE'
const SEARCH_SETFAVORITE_ALIAS = 'SEARCH_SET_FAVORITE_ALIAS'
const SEARCH_SETFAVORITE_SYNC_SUCCESS = 'SEARCH_SETFAVORITE_SYNC_SUCCESS'
const SEARCH_SETFAVORITE_SYNC_FAILURE = 'SEARCH_SETFAVORITE_SYNC_FAILURE'
const SEARCH_SELECTRECIPE = 'SEARCH_SELECTRECIPE'
const SEARCH_CLEARSELECTEDRECIPE = 'SEARCH_CLEAR_SELECTED_RECIPE'
const SEARCH_RESET = 'SEARCH_RESET'
const SEARCH_SET_SORTBYS = 'SEARCH_SET_SORTBYS'
const SEARCH_UPDATE_SELECTED_RECIPE = 'SEARCH_SET_SELECTED_RECIPE'

const AUTH_LOGIN = 'AUTH_LOGIN'
const AUTH_INVALID = 'AUTH_INVALID'
const AUTH_UPDATEDSYNC = 'AUTH_UPDATEDSYNC'
const AUTH_LOGOUT = 'AUTH_LOGOUT'
const AUTH_LOGOUT_ALIAS = 'AUTH_LOGOUT_ALIAS'
const AUTH_LOGIN_PENDING = 'AUTH_LOGIN_PENDING'
const AUTH_LOGIN_FAILED = 'AUTH_LOGIN_FAILED'
const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
const AUTH_CLEAR_ERROR = 'AUTH_CLEAR_ERROR'
const AUTH_SET_FROM_STORE = 'AUTH_SET_FROM_STORE'

const SETTINGS_SET_FROM_STORE = 'SETTINGS_SET_FROM_STORE'
const AUTH_SET_SETTING = 'AUTH_SET_SETTING'

export {
  TABS_SNAP,
  TABS_SETSNAP,
  TABS_REMOVETAB,
  TABS_REMOVEWINDOW,
  TABS_SETRECIPENAME,
  TABS_SETRECIPETAG,
  TABS_ADDRECIPETAG,
  TABS_REMOVERECIPETAG,
  TABS_SETRECIPEPUBLIC,
  TABS_CLEARFIELDS,
  TABS_SET_ISNEW,
  TABS_DELETERECIPE,
  TABS_DELETERECIPE_FAILED,
  TABS_DELETERECIPE_PENDING,
  TABS_DELETERECIPE_SUCCESS,
  TABS_QUICKADD,
  TABS_QUICKADD_ALIAS,
  SEARCH_SETDROPDOWNOPEN,
  SEARCH_SETSEARCHTERMS_ALIAS,
  SEARCH_SETSEARCHTERMS_POPUP,
  SEARCH_SETFAVORITE,
  SEARCH_SETFAVORITE_ALIAS,
  SEARCH_SETFAVORITE_SYNC_FAILURE,
  SEARCH_SETFAVORITE_SYNC_SUCCESS,
  SEARCH_SETSORTBY,
  SEARCH_NEXTROW,
  SEARCH_PREVIOUSROW,
  SEARCH_SETROW,
  SEARCH_SETROW_ALIAS,
  SEARCH_SETRESULTS_PENDING,
  SEARCH_SETRESULTS_FAILED,
  SEARCH_SETRESULTS_SUCCESS,
  SEARCH_GET_INITIAL_RESULTS,
  SEARCH_GET_INITIAL_RESULTS_FAILED,
  SEARCH_GET_INITIAL_RESULTS_PENDING,
  SEARCH_GET_INITIAL_RESULTS_SUCCESS,
  SEARCH_SELECTRECIPE,
  SEARCH_RESET,
  AUTH_LOGIN,
  AUTH_INVALID,
  AUTH_LOGOUT,
  AUTH_LOGOUT_ALIAS,
  AUTH_UPDATEDSYNC,
  AUTH_CLEAR_ERROR,
  AUTH_LOGIN_PENDING,
  AUTH_LOGIN_FAILED,
  AUTH_LOGIN_SUCCESS,
  TABS_SAVERECIPE,
  TABS_SAVERECIPE_PENDING,
  TABS_SAVERECIPE_SUCCESS,
  TABS_SAVERECIPE_FAILED,
  POPUP_TOGGLE_SLIDE,
  POPUP_SYNCRECIPES,
  POPUP_SYNCRECIPES_PENDING,
  POPUP_SYNCRECIPES_FAILED,
  POPUP_SYNCRECIPES_SUCCESS,
  POPUP_OPENED,
  POPUP_SET_HELP_INSTALLED,
  TABS_LAUNCHRECIPE,
  TABS_LAUNCHRECIPE_FAILED,
  TABS_LAUNCHRECIPE_PENDING,
  TABS_LAUNCHRECIPE_SUCCESS,
  TABS_SETCURRENTWINDOW,
  TABS_SETCURRENTTAB,
  TABS_MERGE_POPUP_CLOSED,
  TABS_SETRECIPEFORM,
  TABS_SETSNAP_EXISTING,
  TABS_RESET,
  TABS_MERGE_SESSION,
  TABS_MERGE_SESSION_ALIAS,
  POPUP_TOGGLEEDITING,
  POPUP_TOGGLEEDITING_ALIAS,
  POPUP_SET_WINDOWID,
  SEARCH_CLEARSELECTEDRECIPE,
  SEARCH_SETSORTBY_ALIAS,
  TABS_MOVE_TAB,
  TABS_MOVE_TAB_ALIAS,
  TABS_UPDATE_MOVE_TAB,
  TABS_UPDATE_MOVE_TAB_ALIAS,
  AUTH_SET_FROM_STORE,
  TABS_SETRECIPE_PERMISSIONS,
  TABS_SETRECIPE_PERMISSIONS_ALIAS,
  SETTINGS_SET_FROM_STORE,
  AUTH_SET_SETTING,
  SEARCH_SET_SORTBYS,
  SEARCH_UPDATE_SELECTED_RECIPE,
}
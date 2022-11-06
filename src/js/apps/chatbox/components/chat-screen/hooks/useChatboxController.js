import { useSelector } from "react-redux";

export default function useChatboxController() {

	const { chatboxTemplateOptions, userForm, currentUser } = useSelector((state) => {
        return {
			chatboxTemplateOptions: ( state.chatboxTemplate.template && state.chatboxTemplate.template.options ) ? state.chatboxTemplate.template.options : {},
			userForm: state.userForm,
			currentUser: state.userForm.user,
        };
    });

	/**
	 * Need To Go Contact Page
	 *
	 * @returns bool
	 */
	function needToGoContactPage() {

		const isLoggedIn  = isUserLoggedIn();
		const isClient    = isUserClient();
		const isAdmin     = isUserAdmin();
		const collectInfo = getCollectInfoFields();

		if ( ! isLoggedIn  ) {
			return true;
		}

		if ( isClient || isAdmin ) {
			return false;
		}

		if ( ! collectInfo.length ) {
			return false;
		}

		return true;
	}

	/**
	 * Is Logged In
	 *
	 * @returns bool
	 */
	function isUserLoggedIn() {
		return userForm.user ? true : false;
	}

	/**
	 * Is User Admin
	 *
	 * @returns bool
	 */
	function isUserAdmin() {

		if ( ! userForm.user ) {
			return false;
		}

		return userForm.user.is_admin;

	}

	/**
	 * Is User Client
	 *
	 * @returns bool
	 */
	function isUserClient() {

		if ( ! userForm.user ) {
			return false;
		}

		return userForm.user.is_client;

	}

	/**
	 * User Role Includes
	 *
	 * @param {string} role
	 * @returns bool
	 */
	function userRoleIncludes( role ) {

		if ( ! userForm.user ) {
			return false;
		}

		if ( ! userForm.user.roles ) {
			return false;
		}

		if ( ! Array.isArray( userForm.user.roles ) ) {
			return false;
		}

		return userForm.user.roles.includes( role );
	}

	/**
	 * Enabled Guest Submission
	 *
	 * @returns bool
	 */
	 function enabledGuestSubmission() {
		return userForm.guestSubmission;
	}

	/**
	 * Get Collect Info Fields
	 *
	 * @returns array
	 */
	function getCollectInfoFields() {
		return ( Array.isArray( chatboxTemplateOptions.collectInfo ) ) ? chatboxTemplateOptions.collectInfo : [];
	}


	return {
		currentUser,
		needToGoContactPage,
		isUserLoggedIn,
		isUserAdmin,
		isUserClient,
		userRoleIncludes,
		enabledGuestSubmission,
		getCollectInfoFields,
	};
}
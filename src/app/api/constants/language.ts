const responseMessages = {
  EN: {
    EMAIL_DOES_NOT_EXIST: 'Email does not exists.',
    INVALID_TOKEN: 'Invalid token',
    INVALID_USER_ID: 'UserID does not exists.',
    INVALID_USER_INPUTS: 'Invalid user inputs',
    INSUFFICIENT_PRIVILEGE: 'Not authorized to perform action',
    PASSWORD_CHANGE_INVALID: 'Enter a valid password and try again',
    PASSWORD_RESET_CODE_SENT: 'Password reset code sent.',
    PASSWORD_CHANGED_SUCCESSFULLY: 'Password changed succesfully',
    INVALID_PAGE_ID: 'Page with given pageId not found',
    INVALID_PAGE_INPUTS: 'Invalid page inputs',
    DUPLICATE_EMAIL: 'Email must be unique',
    DUPLICATE_SLUG: 'Slug must be unique',
    DUPLICATE_KEY_ERROR: 'Keys must be unique. Apply unique keys and try again',
    USER_CREATE: 'User created successfully',
    USER_UPDATE: 'User updated successfully',
    USER_DELETE: 'User deleted successfully',
    USER_LISTING: 'User listings',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    BAD_LOCATION: 'Invalid location. Please enter the valid location',
    DUPLICATE_AUTHPROVIDER_ID: 'Auth Provider Id must be unique',
    INVALID_FAQ_ID: 'FAQ with given faqId not found',
    INVALID_FAQ_INPUTS: 'Invalid FAQ inputs',
    FAQ_CREATE: 'FAQ created successfully',
    FAQ_UPDATE: 'FAQ updated successfully',
    FAQ_DELETE: 'FAQ deleted successfully',
    INVALID_EMAIL_TEMPLATE_INPUTS:
      'Invalid $property for email template inputs',
    FAQ_LISTING: 'FAQ listings',
    EMAIL_TEMPLATE_LISTINGS: 'Email Template listings',
    EMAIL_TEMPLATE_CREATE: 'Email Template created successfully',
    EMAIL_TEMPLATE_UPDATE: 'Email Template updated successfully',
    EMAIL_TEMPLATE_DELETE: 'Email Template deleted successfully',
    EMAIL_TEMPLATE_NOT_FOUND: 'Email Template with given templateId not found',
    INVALID_PROPERTY_LENGTH: 'Invalid $property length',
    HOME_TEMPLATE_LISTINGS: 'Home Template listings',
    HOME_TEMPLATE_CREATE: 'Home Template created successfully',
    HOME_TEMPLATE_UPDATE: 'Home Template updated successfully',
    HOME_TEMPLATE_DELETE: 'Home Template deleted successfully',
    TESTIMONIALS_LISTINGS: 'Testimonials listings',
    TESTIMONIALS_CREATE: ' Testimonials created successfully',
    TESTIMONIALS_UPDATE: 'Testimonials updated successfully',
    TESTIMONIALS_DELETE: 'Testimonials deleted successfully',
  },
};
const lang = process.env.SYSTEM_LANGUAGE || 'EN';

let Messages;

if (lang == 'EN') {
  Messages = responseMessages.EN;
}

export default Messages;

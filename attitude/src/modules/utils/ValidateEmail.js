export default class ValidateEmail {

    isValid(emailString) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailString.match(mailformat)) {
            return true;
        }
        return false;
    }
}

export default class ValidatePhone {

    isValid(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return true
        }
        return false
    }

    formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return ({ phoneNumber: (['(', match[1], ')', ' ', match[2], '-', match[3]].join('')), match: true });
        }


        return ({ phoneNumber: phoneNumberString, match: false });
    }

}
export default class Validator {
    constructor(input, field) {
        this.input = input;
        this.field = field;
        this.errors = [];
    }

    required() {
        if (Boolean(this.input) === false) {
            this.errors.push(`The <b>${this.field}</b> field is required.`);
        }
        return this;
    }

    min(min) {
        if (this.input.length < min) {
            this.errors.push(`<b>${this.field}</b> must be longer than ${min} characters.`);
        }
        return this;
    }
    
    max(max) {
        if (this.input.length > max) {
            this.errors.push(`<b>${this.field}</b> must be shorter than ${max} characters.`);
        }
        return this;
    }

    equalWith(subject) {
        if (this.input !== subject) {
            this.errors.push(`<b>${this.field}</b>s must match`);
        }
        return this;
    }
}

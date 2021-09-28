class BaseModel {
    constructor(data, message) {
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
        if (data === 'string') {
            this.message = data;
            this.data = null;
            this.message = null
        }
    }
}
// 成功得情况
class SucceedModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.err = 0;
    }
};
// 失败了的情况
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message);
        this.err = -1;
    }
}
module.exports = {
    SucceedModel,
    ErrorModel
}
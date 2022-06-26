export const TYPE_LOG = 'log';
export const TYPE_WARM = 'warm';
export const TYPE_ERROR = 'error';

function kkk(log, type = TYPE_LOG) {
    console[type](log);
}
export default kkk;  //Chỉ export được 1 cái dèault
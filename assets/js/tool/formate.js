export const formate = {
    /**
     * @function 格式化时间
     * @param {number} 数值
     * @return {string} 时间日期
     */
    dataFormat: function(time) {
        if (time === '') {
            return;
        }
        const oldDate = new Date(time);
        const year = oldDate.getFullYear();
        const month = (oldDate.getMonth() + 1).toString().padStart(2, '0');
        const day = oldDate.getDate().toString().padStart(2, '0');
        // const month = oldDate.getMonth() < 10 ? '0' + (oldDate.getMonth() + 1) : oldDate.getMonth() + 1;
        // const day = oldDate.getDate() < 10 ? '0' + (oldDate.getDate() + 1) : oldDate.getDate();
        const hour = oldDate.getHours();
        const minute = oldDate.getMinutes();
        const second = oldDate.getSeconds();

        return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
    }
};
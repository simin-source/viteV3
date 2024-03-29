function formatNumber(n: number) {
    const str = n.toString();
    return str[1] ? str : `0${str}`;
}

export function formatTime(date: Date, str = '-', hm = false) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const t1 = [year, month, day].map(formatNumber).join(str);
    // const t2 = [hour, minute, second].map(formatNumber).join(':');
    const t2 = [hour, minute].map(formatNumber).join(':');

    return `${t1}${hm ? ` ${t2}` : ''}`;
}

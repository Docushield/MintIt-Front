import moment from "moment";

export const formatUntilLive = (until) => {
    if (!until || moment(new Date()).isAfter(until)) {
        return "LIVE";
    }
    const diff = moment(until).diff(moment(new Date()), "seconds");
    return `${Math.floor(diff / 3600)}:${Math.floor((diff % 3600) / 60)}:${
        diff % 60
    }`;
};

export const formatDate = (date, formatter = "YYYY-MM-DD") => {
    return moment(date).format(formatter);
};

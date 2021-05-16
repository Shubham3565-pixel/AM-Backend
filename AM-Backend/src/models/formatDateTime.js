function formatDateTime(data){
    var data1=[];
    for (var i of data){
        r=String(i.datetime)
        date=r.substring(4,15);
        time=r.substring(16,25);
        i.date=date;
        i.time=time;
        delete i.datetime;
        data1.push({
            id:i.id,
            data:i.date,
            time:i.time,
            debit:i.debit,
            credit:i.credit,
            totalbalance:i.totalbalance,
            description:i.description
        })
    }
    return data1;
}

module.exports = formatDateTime;
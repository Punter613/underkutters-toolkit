module.exports = function(job){

    let laborTotal = 0;
    let materialTotal = 0;

    (job.labor || []).forEach(item => {
        laborTotal += Number(item.hours || 0) * Number(item.rate || 0);
    });

    (job.materials || []).forEach(item => {
        materialTotal += Number(item.cost || 0);
    });

    const subtotal = laborTotal + materialTotal;
    const tax = subtotal * 0.075;

    return {
        laborTotal,
        materialTotal,
        subtotal,
        tax,
        total: subtotal + tax
    };
};

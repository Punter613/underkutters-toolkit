function calculateProfit(job){

    const materials = (job.materials || [])
        .reduce((sum,m)=>sum + Number(m.cost || 0),0);

    const labor = (job.labor || [])
        .reduce((sum,l)=>sum + 
        (Number(l.hours || 0) * Number(l.rate || 0)),0);

    const cost = materials + labor;

    const revenue = Number(job.total || job.estimate || 0);

    return {
        job: job.number,
        customer: job.customer,

        revenue,

        costs:{
            materials,
            labor,
            total: cost
        },

        profit: revenue - cost,

        margin: revenue
            ? (((revenue-cost)/revenue)*100).toFixed(2)+"%"
            : "0%"
    };
}

module.exports = {
    calculateProfit
};

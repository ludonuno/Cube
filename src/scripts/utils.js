const YearList = () => {
    let yearList = []
    for (let year = 1950; year < new Date().getFullYear() + 20; year++) yearList.push(year)
    return yearList
} 

const MonthList = () => {
    return [
        {id:1, mes: 'Janeiro'},
        {id:2, mes: 'Fevereiro'},
        {id:3, mes: 'Março'},
        {id:4, mes: 'Abril'},
        {id:5, mes: 'Maio'},
        {id:6, mes: 'Junho'},
        {id:7, mes: 'Julho'},
        {id:8, mes: 'Agosto'},
        {id:9, mes: 'Setembro'},
        {id:10, mes: 'Outubro'},
        {id:11, mes: 'Novembro'},
        {id:12, mes: 'Dezembro'},
    ]
} 

const DayList = (year, month) => {
    let month31 = [1, 3, 5, 7, 8, 10, 12]
    if(month === 2) {
        if(year % 4 === 0 && year % 100 !== 0) {
            let DayList = []
            for (let day = 1; day <= 29; day++) DayList.push(day)
            return DayList
        } else {
            if(year % 400 === 0) {
                let DayList = []
                for (let day = 1; day <= 29; day++) DayList.push(day)
                return DayList
            } else {
                let DayList = []
                for (let day = 1; day <= 28; day++) DayList.push(day)
                return DayList
            }
        }
    } else if (month31.includes(Number(month))) {
        let DayList = []
        for (let day = 1; day <= 31; day++) DayList.push(day)
        return DayList
    } else {
        let DayList = []
        for (let day = 1; day <= 30; day++) DayList.push(day)
        return DayList
    }
}


module.exports = {
    YearList,
    MonthList,
    DayList
}
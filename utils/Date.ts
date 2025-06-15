const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

interface DayObject {
    id: number,
    dayName: string,
    dayNumber: number,
}

interface DateObject {
    year: number,
    month: string,
    monthNumber: number,
    days: Array<DayObject>
}

function getCurrentDate(){
    const date = new Date()
    return {"year": date.getFullYear(), "month": date.getMonth(), "day": date.getDate()}
}

function getDate(month?: number, year?: number): DateObject {
    const date = new Date()
    month && year ? date.setFullYear(year, (month + 1), 0) : date.setMonth(date.getMonth() + 1, 0)
    const numDaysInMounth = date.getDate()
    date.setDate(1)
    const arrayDays: Array<DayObject> = []

    for (let i = 0; i < numDaysInMounth; i++) {
        arrayDays.push(
            {
                id: arrayDays.length,
                dayName: date.toLocaleDateString("pt-BR", { weekday: 'long' }),
                dayNumber: date.getDate()
            }
        )
        date.setDate(date.getDate() + 1)
    }

    return {
        "year": year ? year : date.getFullYear(),
        "month": MESES[month ? month : date.getMonth() - 1],
        "monthNumber": month ? month : date.getMonth() - 1,
        "days": arrayDays
    }
}

export { getDate, getCurrentDate }
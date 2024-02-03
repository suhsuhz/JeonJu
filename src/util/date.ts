// dete를 로컬 date로 바꿔주기
export const setDateToLocalDate = (date: number) => {
    return `${new Date(date).toLocaleDateString()} ${new Date(
        date
    ).toLocaleTimeString()}`;
};

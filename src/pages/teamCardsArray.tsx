interface ICardsType {
    itemName: string;
    itemDetails: string;
    foundationYear: number
}

type cardsArray = ICardsType[];

export const teamCardsArray: cardsArray = [
    {
        itemName: 'Portland trail blazers1',
        itemDetails: 'Year of foundation: 1970',
        foundationYear: 2010
    },
    {
        itemName: 'Portland trail blazers2',
        itemDetails: 'Year of foundation: 1970',
        foundationYear: 2010
    },
    {
        itemName: 'Portland trail blazers3',
        itemDetails: 'Year of foundation: 1970',
        foundationYear: 2010
    },
]
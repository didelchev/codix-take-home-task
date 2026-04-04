interface Transaction { 
    id: number,
    date: string,
    name: string,
    city: string,
    bic: string,
    bankCard: string,
    amount: number,
    type: 'Credit' | 'Debit',
    status: 'Completed' | 'Pending' | 'Failed'
}
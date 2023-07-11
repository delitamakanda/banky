export interface GetKpisResponse {
    readonly id?: number;
    total_profit: string;
    total_revenue: string;
    total_expenses: string;
    /**
     * Expenses by category
     */
    expenses_by_category: Map<string, string>;
    /**
     * Daily data
     */
    daily_data: DailyData[];
    /**
     * Monthly data
     */
    monthly_data: MonthlyData[];
}
export interface GetProductsResponse {
    readonly id?: string;
    price: string;
    expense: string;
    transactions?: Array<string>;
}
export interface GetTransactionsResponse {
    readonly id?: string;
    amount: string;
    buyer: number;
    products_ids?: Array<string>;
}

export interface MonthlyData {
    expenses: string;
    month: string;
    nonOperationalExpenses: string;
    operationalExpenses: string;
    revenue: string;
}

export interface DailyData {
    date: string;
    expenses: string;
    revenue: string;
}

export interface AuthToken { 
    username: string;
    password: string;
    readonly token?: string;
}

export interface Action { 
    readonly id?: number;
    readonly user_friendly_id?: string;
    /**
     * User on make an action
     */
    user: number;
    readonly created?: Date;
    account: number;
    type?: TypeEnum;
    /**
     * Balance delta.
     */
    delta: number;
    reference: string;
    reference_type?: ReferenceTypeEnum;
    comment?: string;
    /**
     * Balance after action
     */
    debug_balance: number;
}
export type TypeEnum = 'CREATED' | 'DEPOSITED' | 'WITHDRAWN';
export const TypeEnum = {
    CREATED: 'CREATED' as TypeEnum,
    DEPOSITED: 'DEPOSITED' as TypeEnum,
    WITHDRAWN: 'WITHDRAWN' as TypeEnum
};
export type ReferenceTypeEnum = 'BANK_TRANSFER' | 'CHECK' | 'CASH' | 'NONE';
export const ReferenceTypeEnum = {
    BANKTRANSFER: 'BANK_TRANSFER' as ReferenceTypeEnum,
    CHECK: 'CHECK' as ReferenceTypeEnum,
    CASH: 'CASH' as ReferenceTypeEnum,
    NONE: 'NONE' as ReferenceTypeEnum
};

export interface Account { 
    readonly id?: number;
    readonly uid?: string;
    user: number;
    readonly created?: Date;
    readonly modified?: Date;
    balance?: number;
    readonly days_since_created?: string;
}

export interface User { 
    readonly id?: number;
    username: string;
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
    date_joined?: Date;
    password2: string;
}

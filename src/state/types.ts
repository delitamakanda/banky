export interface GetKpisResponse {
    readonly id?: number;
    total_profit: string;
    total_revenue: string;
    total_expenses: string;
    /**
     * Expenses by category
     */
    expenses_by_category?: any;
    /**
     * Daily data
     */
    daily_data?: any;
    /**
     * Monthly data
     */
    monthly_data: MonthlyData[];
}

export interface MonthlyData {
    expenses: string;
    month: string;
    nonOperationalExpenses: string;
    operationalExpenses: string;
    revenue: string;
}
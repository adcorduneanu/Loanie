﻿import { Loan } from 'modules/loan/types';

export default class LoanCalculatorService {
    constructor(loanPrincipal, numberOfPayments, interestRate) {
        this.loanPrincipal = loanPrincipal;
        this.numberOfPayments = numberOfPayments;
        this.interestRate = interestRate;

        this.loans = [];

        this.generate();
    }

    generate = () => {
        let principal = this.loanPrincipal;
        let payments = this.numberOfPayments;

        do {
            let current = new Loan(principal, payments, this.interestRate)

            this.loans.push(current);

            principal = current.newBalance;
            payments--;
        }
        while (principal > 0 && payments > 0)
    };

    refund = (month, amount) => {
        let current = this.loans .filter(loan => loan.numberOfPayments === month)[0];
        let index = this.loans .indexOf(current);

        if (index === -1) {
            return;
        }

        current.refund(amount);
        let principal = this.loans [index].newBalance;

        for (let payment = index + 1; payment < this.loans .length; payment++) {
            this.loans [payment].loanPrincipal = principal
            principal = this.loans [payment].newBalance;
        }
    };

    flush = () => {
        this.loans .forEach((current) => {
            console.log({
                ...current, ...{
                    monthlyPayment: current.monthlyPayment,
                    interest: current.interest,
                    newBalance: current.newBalance
                }
            });
        });
    };
}
export const DEFAULT_LOCALE = 'en-US';
export const DEFAULT_CURRENCY = 'USD';

type CurrencyType = 'USD' | 'EUR' | 'RUB';

const currencyFormat = ({
  currencyCode = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE,
}: {
  currencyCode?: CurrencyType;
  locale?: string;
}) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  });
};

export const formatAmount = ({ amount, currencyCode }: { amount: number; currencyCode?: CurrencyType }) => {
  if (!amount) {
    return '0';
  }

  return currencyFormat({ currencyCode }).format(amount);
};

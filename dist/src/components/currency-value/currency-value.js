import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from "ink";
export const CurrencyValue = ({ value, localeCode, currencyCode })=>{
    return /*#__PURE__*/ _jsx(Text, {
        children: new Intl.NumberFormat(localeCode, {
            style: 'currency',
            currency: currencyCode
        }).format(value)
    });
};

//# sourceMappingURL=currency-value.js.map
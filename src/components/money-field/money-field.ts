import {ref, toRefs} from "vue";

// TODO: Colocar regra que a precisão sempre deve ser de 2 e no mínimo de ",00"
export default {
    props: {
        localeMoney: {type: String, default: 'pt-br'},
        localeCurrencyMoney: {type: String, default: 'BRL'},
        valueField: {type: Number, default: 1_000}
    },
    setup(props, {emit}) {
        const {
            localeMoney: locale_money,
            valueField: value_field,
            localeCurrencyMoney: locale_currency_money
        } = toRefs(props)
        const money_field = ref<HTMLInputElement>()

        /**
         * Remove a formatação do campo
         * @param value campo formatado
         */
        const remove_format_money = (value: string): number =>
            Number(value.replaceAll(/\D/g, '')) / 100


        /**
         * Cria a formatação do campo
         * @param value campo sem formatação
         */
        const format_to_money = (value: number): string =>
            new Intl.NumberFormat(locale_money.value,
                {
                    style: 'currency',
                    currency: locale_currency_money.value,
                    minimumFractionDigits: 2

                }
            ).format(value)

        /**
         * Remove a máscara e envia o valor por um emit com nome 'money-update'
         */
        function blur_remove_money_mask(): void {
            const input = money_field.value

            if (!input) return;

            const value = remove_format_money(input.value.replace(/\D/gim, ''));

            emit('money-update', value)
        }

        /**
         * Valida as teclas pressionadas no caso do 'ArrowUp' e 'ArrowDown'
         * vão somar ou subtrair 0,01 do valor total, no caso de não serem números
         * o valor não poderá ser alterado
         * @param event
         */
        function key_down_validate_type(event: KeyboardEvent): void {
            const input = money_field.value

            if (!input) {
                event.preventDefault()
                return;
            }

            if (event.key === 'ArrowUp') {
                event.preventDefault()

                const value = Number(remove_format_money(input.value)) + 0.01

                input.value = format_to_money(value)
            }

            if (event.key === 'ArrowDown') {
                event.preventDefault()

                const value = Number(remove_format_money(input.value)) - 0.01

                input.value = format_to_money(value)
            }

            if (!(event.key === 'ArrowLeft'
                    || event.key === 'ArrowRight')
                && isNaN(Number(event.key))
            ) {
                event.preventDefault()
            }
        }

        /**
         * Quando a tecla terminou de ser acionada caso obedeça às regras
         * do evento de 'KeyDown' o valor no campo será formatado de acordo como a moeda escolhida
         */
        function key_up_format_money(): void {
            const input = money_field.value

            if (!input) return;

            input.value = format_to_money(remove_format_money(input.value))
        }

        return {
            money_field,
            value_field,
            blur_remove_money_mask,
            format_to_money,
            key_up_format_money,
            key_down_validate_type
        }
    }
}

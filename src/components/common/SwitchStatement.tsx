import { ReactNode, Children, ReactElement } from "react";

export interface SwitchProps<V> {
    children: ReactElement<CaseProps<V>>[] | ReactElement<CaseProps<V>>;
    select: any;
    otherwise?: ReactNode;
}

export const Switch = <V = any>({ children, select, otherwise }: SwitchProps<V>) => {
    const selected =
        Children.toArray(children)
            .filter((child) =>
            (child as ReactElement<CaseProps<V>>).props.value === select);
    return <>{selected.length > 0 ? selected[0] : otherwise ? otherwise : <></>}</>;
};

export type CaseProps<V> = {
    value: V;
    render?: ReactNode;
    children?: ReactNode;
};

export const Case = <V = any>({ children, render }: CaseProps<V>) => {
    return <>{children ? children : render ? render : <></>}</>;
};
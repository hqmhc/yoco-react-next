import { FC, HTMLAttributes, ReactChild } from 'react';
export interface Props extends HTMLAttributes<HTMLFormElement> {
    children?: ReactChild;
    onSubmit: () => void;
}
export declare const InlineForm: FC<Props>;

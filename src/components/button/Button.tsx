import { HTMLAttributes, SetupContext } from 'vue';

import btnStyle from './Button.module.scss';

interface ButtonProps extends  HTMLAttributes {
    className?: string;
}
export default function (props: ButtonProps, { slots }: SetupContext) {
    return <div class={`${btnStyle.button} ${props.className}`} style={props.style}>
        {slots.default?.()}
    </div>;
}